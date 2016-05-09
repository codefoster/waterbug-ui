import { Component, provide } from "@angular/core";
import { RaceService } from "../race.service/race.service"
import { DashboardComponent } from "../dashboard.component/dashboard.component";
import { RowerListComponent } from "../rower-list.component/rower-list.component";

@Component({
    selector: "race",
    templateUrl: "app/race.component/race.component.html",
    directives: [DashboardComponent, RowerListComponent],
    providers: [RaceService],
    styleUrls:["app/race.component/race.component.css"]
})
export class RaceComponent {
    constructor() {
    }
}

