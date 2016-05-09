import { Component, provide } from "@angular/core";
import { RaceService } from "../race.service/race.service"
import { MdButton } from "@angular2-material/button";

@Component({
    selector: "dashboard",
    templateUrl: "app/dashboard.component/dashboard.component.html",
    directives: [MdButton],
    styleUrls: ["app/dashboard.component/dashboard.component.css"]
})
export class DashboardComponent {


    constructor(private raceService: RaceService) {
        
    }

}

