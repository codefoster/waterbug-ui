import { Component, provide } from "angular2/core";
import { AppService } from "../app.service/app.service"
import { RaceControls } from "../race-controls.component/race-controls.component";
import { RowerList } from "../rower-list.component/rower-list.component";

@Component({
    selector: "race",
    templateUrl: "app/race.component/race.component.html",
    directives: [RaceControls, RowerList],
    styleUrls:["app/race.component/race.component.css"]
})
export class Race {
    private socket;

    constructor(private appService: AppService) {
    }
}

