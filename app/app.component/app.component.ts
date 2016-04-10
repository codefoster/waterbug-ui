import { Component, provide } from "angular2/core";
import { RaceComponent } from "../race.component/race.component";
import { RaceService } from "../race.service/race.service";

@Component({
    selector: "app",
    templateUrl: "app/app.component/app.component.html",
    directives: [RaceComponent],
    providers: [RaceService],
    styleUrls: ["app/app.component/app.component.css"],
})
export class AppComponent {}

