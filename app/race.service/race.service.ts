import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Config } from '../config';
import { Observable, Subject} from 'rxjs/Rx';

@Injectable()
export class RaceService {
    private socket: SocketIOClient.Socket;
    config: any = new Config();
    raceDistance: number = this.config.defaultRaceDistance;
    startTime: Date;
    rowers: any[] = [];

    private messages = new Subject();
    messages$: Observable<any> = this.messages.asObservable();
    strokedata$ = this.messages$.filter(m => m.message == "strokedata");

    get raceOn(): boolean {
        return this.startTime != null;
    }

    constructor() {
        //connect to the socket server
        this.socket = io.connect(this.config.socketServerUrl);
        
        //stream all messages into our Rx Subject
        this.socket.on("message", d => this.messages.next(d));

        //handle the strokes
        this.strokedata$.subscribe(d => {
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
                r.distance = Math.min(this.raceDistance, d.distance);
                if (r.distance >= this.raceDistance) {
                    //TODO:declare winner
                    this.startTime = null;
                }
            }
        })

        //handle race start events 
        this.messages$.filter(m => m.message == "startrace").subscribe(d => {
            this.startTime = d.startTime;
            this.raceDistance = d.distance;
            this.rowers.forEach(r => { r.distance = 0; r.strokeRates = []; });
            console.log(`race started\n  start time: ${this.startTime}\n  race distance: ${this.raceDistance}`);
        });

        //handle race stop events        
        this.messages$.filter(m => m.message == "stoprace").subscribe(d => {
            // a non-null value for this.raceService.startTime should mean a race is currently underway
            // to stop a race, simply null that value
            this.startTime = null;
            console.log("race stopped");
        });

        // handle remove rower events        
        this.messages$.filter(m => m.message == "removerower").subscribe(d => {
            this.rowers = this.rowers.filter(r => r.name != d.name);
            console.log(`${d.name} removed`);
        });
    }

    simulateStroke(name: string) {
        this.socket.send({
            message: "strokedata",
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
            distance: this.config.defaultRaceDistance //hard code to distance for now
        });
    }

    stopRace() {
        this.socket.send({
            message: "stoprace"
        });
    }

    removeRower(name: string) {
        this.socket.send({
            message: "removerower",
            name: name
        })
    }

}