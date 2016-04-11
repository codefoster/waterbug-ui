import { Component, provide } from "angular2/core";
import { RaceService } from "../race.service/race.service"

@Component({
    selector: "race-controls",
    templateUrl: "app/race-controls.component/race-controls.component.html",
    styleUrls: ["app/race-controls.component/race-controls.component.css"]
})
export class RaceControlsComponent {


    constructor(private raceService: RaceService) {
        
    }

}

