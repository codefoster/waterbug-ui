import { Injectable } from 'angular2/core';
import * as io from 'socket.io-client';

const DEFAULT_RACE_DISTANCE: number = 500;

@Injectable()
export class RaceService {
    private socket:SocketIOClient.Socket;
    raceDistance: number = DEFAULT_RACE_DISTANCE;
    startTime: Date;
    rowers: any[] = [];

    get raceOn(): boolean {
        return this.startTime != null;
    }

    constructor() {
        this.socket = io.connect("http://server.waterbug.site");
        // this.socket = io.connect("http://localhost:8080");
        this.socket.on("message", d => {
            switch(d.message) {
                case "startrace":
                    this.startTime = d.startTime;
                    this.raceDistance = d.distance;
                    this.rowers.forEach(r => { r.distance = 0; r.strokeRates = []; });
                    console.log(`race started\n  start time: ${this.startTime}\n  race distance: ${this.raceDistance}`);
                    break;
                case "stoprace":
                    // a non-null value for this.raceService.startTime should mean a race is currently underway
                    // to stop a race, simply null that value
                    this.startTime = null;
                    console.log("race stopped");
                    break;
                case "stroke": 
                    //TODO: update our app state with the new message
                    //will require adding the stroke rate to the user's array
                    console.log(`stroke received from ${d.name}`);

                    // add user if not exist
                    if (!this.rowers.some(r => r.name == d.name)) {
                        console.log(`adding ${d.name}`);
                        this.rowers.push({
                            name: d.name,
                            strokeRates: [],
                            caloriesPerMinute: 0,
                            distance: 0
                        });
                    }

                    if (this.raceOn) {
                        let r = this.rowers.filter(r => r.name == d.name)[0];
                        r.strokeRates.push(d.strokeRate);
                        r.distance = Math.min(this.raceDistance, r.distance + d.distance);
                        if (r.distance >= this.raceDistance) {
                            //TODO:declare winner
                            this.startTime = null;
                        }
                    }
                    break;
            }
        });
    }

    simulateStroke(name: string) {
        this.socket.send({
            message: "stroke",
            name: name,
            strokeRate: Math.round((Math.random() * 5) + 20),
            caloriesPerMinute: Math.round((Math.random() * 10) + 70),
            distance: Math.round((Math.random() * 5) + 20)
        })
    }

    startRace() {
        this.socket.send({
            message: "startrace",
            startTime: new Date(),
            distance: DEFAULT_RACE_DISTANCE //hard code to distance for now
        });
    }

    stopRace() {
        this.socket.send({
            message: "stoprace"
        });
    }

}