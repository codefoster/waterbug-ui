import { Component, provide } from "@angular/core";
import { RaceService } from "../race.service/race.service"
import { RowerComponent } from "../rower.component/rower.component";

@Component({
    selector: "rower-list",
    templateUrl: "app/rower-list.component/rower-list.component.html",
    directives: [RowerComponent],
    styleUrls: ["app/rower-list.component/rower-list.component.css"]
})
export class RowerListComponent {
    private socket;

    constructor(private raceService: RaceService) {
    }

}

