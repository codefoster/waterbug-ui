import { bootstrap } from 'angular2/platform/browser';
import { Component, provide } from "angular2/core";
import { Rower } from "../rower/rower";
import { AppService } from "../app.service/app.service"
import { HTTP_PROVIDERS } from "angular2/http";

@Component({
    selector: "app",
    templateUrl: "app/app/app.html",
    directives: [Rower],
    providers: [HTTP_PROVIDERS],
    styleUrls: ["app/app/app.css"]
})
export class App {
    private socket;

    constructor(private appService: AppService) {
        this.socket = io("http://cf.ngrok.io");

        //handle a stroke message
        this.socket.on("stroke", (data) => {
            //TODO: update our app state with the new message
            //will require adding the stroke rate to the user's array
            console.log(JSON.stringify(data));
        });

        this.socket.on("startrace", (racedata) => {
            this.appService.state.startTime = racedata.startTime;
            this.appService.state.raceDistance = racedata.distance;
            console.log(`race started\n  start time: ${this.appService.state.startTime}\n  race distance: ${this.appService.state.raceDistance}`);
        })

        this.socket.on("stoprace", () => {
            // a non-null value for this.appService.state.startTime should mean a race is currently underway
            // to stop a race, simply null that value
            this.appService.state.startTime = null;
            console.log("race stopped");
        })
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
}

bootstrap(App, [AppService]);