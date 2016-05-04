import { Component, provide } from "angular2/core";
import { RaceService } from "../race.service/race.service"

@Component({
    selector: "dashboard",
    templateUrl: "app/dashboard.component/dashboard.component.html",
    styleUrls: ["app/dashboard.component/dashboard.component.css"]
})
export class DashboardComponent {


    constructor(private raceService: RaceService) {
        
    }

}

