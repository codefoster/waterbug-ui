import { Component, provide } from "angular2/core";
import { AppService } from "../app.service/app.service"
import { RowerComponent } from "../rower.component/rower.component";

@Component({
    selector: "rower-list",
    templateUrl: "app/rower-list.component/rower-list.component.html",
    directives: [RowerComponent],
    styleUrls: ["app/rower-list.component/rower-list.component.css"]
})
export class RowerListComponent {
    private socket;

    constructor(private appService: AppService) {
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

