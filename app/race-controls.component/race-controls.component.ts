import { Component, provide } from "angular2/core";
import { AppService } from "../app.service/app.service"

@Component({
    selector: "race-controls",
    templateUrl: "app/race-controls.component/race-controls.component.html",
    styleUrls: ["app/race-controls.component/race-controls.component.css"]
})
export class RaceControlsComponent {
    private socket;

    constructor(private appService: AppService) {
        this.socket = io("http://cf.ngrok.io");

        //handle a stroke message
        this.socket.on("stroke", (data) => {
            //TODO: update our app state with the new message
            //will require adding the stroke rate to the user's array
            console.log(`stroke received from ${data.name}`);
            if (this.appService._state.rowers.findIndex(r => r.name == data.name) == -1) {
                console.log(`adding ${data.name}`);
                this.appService._state.rowers.push({
                    name: data.name,
                    strokeRates: [data.strokeRate],
                    caloriesPerMinute: data.caloriesPerMinute,
                    distance: data.distance
                });
            } else {
                let r = this.appService._state.rowers.find(r => r.name == data.name)
                r.strokeRates.push(data.strokeRate);
                r.distance += data.distance;
            }
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

    simulateStroke(name: string) {
        this.socket.emit("stroke", {
            name: name,
            strokeRate: (Math.random() * 5) + 20,
            caloriesPerMinute: (Math.random() * 10) + 70,
            distance: (Math.random() * 10) + 95
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
}

