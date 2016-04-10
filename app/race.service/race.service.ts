import { Injectable } from 'angular2/core';
// import * as _ from 'lodash';

@Injectable()
export class RaceService {
    private socket;
    raceDistance: number;
    startTime: Date;
    rowers: any[] = [];

    constructor() {
        this.socket = io("http://localhost:8080");

        //handle a stroke message
        this.socket.on("stroke", (data) => {
            //TODO: update our app state with the new message
            //will require adding the stroke rate to the user's array
            console.log(`stroke received from ${data.name}`);
            if (this.rowers.findIndex(r => r.name == data.name) == -1) {
                console.log(`adding ${data.name}`);
                this.rowers.push({
                    name: data.name,
                    strokeRates: [data.strokeRate],
                    caloriesPerMinute: data.caloriesPerMinute,
                    distance: data.distance
                });
            } else {
                let r = this.rowers.find(r => r.name == data.name)
                r.strokeRates.push(data.strokeRate);
                r.distance += data.distance;
            }
        });

        this.socket.on("startrace", (racedata) => {
            this.startTime = racedata.startTime;
            this.raceDistance = racedata.distance;
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
            distance: Math.round((Math.random() * 10) + 95)
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