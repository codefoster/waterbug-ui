import { Component, provide } from "angular2/core";
import { RaceService } from "../race.service/race.service"
import { RaceControlsComponent } from "../race-controls.component/race-controls.component";
import { RowerListComponent } from "../rower-list.component/rower-list.component";

@Component({
    selector: "race",
    templateUrl: "app/race.component/race.component.html",
    directives: [RaceControlsComponent, RowerListComponent],
    providers: [RaceService],
    styleUrls:["app/race.component/race.component.css"]
})
export class RaceComponent {
    private socket;

    constructor(private raceService: RaceService) {
    }
}

