import { Component } from 'angular2/core';
import { AppService } from '../app.service/app.service';

@Component({
    selector: 'rower',
    inputs: ['rower'],
    templateUrl: 'app/rower/rower.html',
    styleUrls: ['app/rower/rower.css']
})
export class Rower {
    public rower: any;
    public raceDistance;
    private socket;

    constructor(appService: AppService) {
        this.socket = io("http://cf.ngrok.io");

        this.raceDistance = appService.state.raceDistance;
    }

    simulateStroke() {
        this.socket.emit("stroke", {
            name: this.rower.name,
            strokeRate: (Math.random() * 5) + 20,
            caloriesPerMinute: (Math.random() * 10) + 70,
            distance: 0
        });
    }
}
//