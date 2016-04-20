import { Injectable } from 'angular2/core';
// import * as _ from 'lodash';

@Injectable()
export class RaceService {
    private socket;
    raceDistance: number;
    startTime: Date;
    rowers: any[] = [];

    get raceOn():boolean {
        return this.startTime != null;
    }
    
    get elapsedTime():any {
    //     // return (Date.now() - this.startTime;
        return 0;
    }

    constructor() {
        this.socket = io("http://localhost:8080");

        //handle a stroke message
        this.socket.on("stroke", (data) => {
            //TODO: update our app state with the new message
            //will require adding the stroke rate to the user's array
            console.log(`stroke received from ${data.name}`);

            // add user if not exist
            if (!this.rowers.some(r => r.name == data.name)) {
                console.log(`adding ${data.name}`);
                this.rowers.push({
                    name: data.name,
                    strokeRates: [],
                    caloriesPerMinute: 0,
                    distance: 0
                });
            }

            if (this.raceOn) {
                let r = this.rowers.filter(r => r.name == data.name)[0];
                r.strokeRates.push(data.strokeRate);
                r.distance = Math.min(this.raceDistance, r.distance + data.distance);
                if (r.distance >= this.raceDistance) {
                    //TODO:declare winner
                    this.startTime = null;
                }
            }
        });

        this.socket.on("startrace", (racedata) => {
            this.startTime = racedata.startTime;
            this.raceDistance = racedata.distance;
            this.rowers.forEach(r => { r.distance = 0; r.strokeRates = []; });
            console.log(`race started\n  start time: ${this.startTime}\n  race distance: ${this.raceDistance}`);
        })

        this.socket.on("stoprace", () => {
            // a non-null value for this.raceService.startTime should mean a race is currently underway
            // to stop a race, simply null that value
            this.startTime = null;
            console.log("race stopped");
        })
    }

    simulateStroke(name: string) {
        this.socket.emit("stroke", {
            name: name,
            strokeRate: Math.round((Math.random() * 5) + 20),
            caloriesPerMinute: Math.round((Math.random() * 10) + 70),
            distance: Math.round((Math.random() * 5) + 20)
        });
    }

    startRace() {
        let racedata = {
            startTime: new Date(),
            distance: 500 //hard code to 500m for now
        };
        this.socket.emit("startrace", racedata);
    }

    stopRace() {
        this.socket.emit("stoprace");
    }

    // getRank(name:string) {
    //     let rankedRowers = this.rowers.order(r => r.distance);
    //     return rankedRowers.findIndex(r => r.name == name) + 1;
    // }

}