import { Component, provide } from "angular2/core";
import { AppService } from "../app.service/app.service"
import { RaceControlsComponent } from "../race-controls.component/race-controls.component";
import { RowerListComponent } from "../rower-list.component/rower-list.component";

@Component({
    selector: "race",
    templateUrl: "app/race.component/race.component.html",
    directives: [RaceControlsComponent, RowerListComponent],
    styleUrls:["app/race.component/race.component.css"]
})
export class RaceComponent {
    private socket;

    constructor(private appService: AppService) {
    }
}

