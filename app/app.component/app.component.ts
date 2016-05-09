import { Component, provide } from "@angular/core";
import { RaceComponent } from "../race.component/race.component";

@Component({
    selector: "app",
    templateUrl: "app/app.component/app.component.html",
    directives: [RaceComponent],
    styleUrls: ["app/app.component/app.component.css"],
})
export class AppComponent {
    constructor(){
    }
}

