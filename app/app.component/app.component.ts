import { Component, provide } from "angular2/core";
import { AppService } from "../app.service/app.service"
import { Race } from "../race.component/race.component";

@Component({
    selector: "app",
    templateUrl: "app/app.component/app.component.html",
    directives: [Race],
    styleUrls: ["app/app.component/app.component.css"]
})
export class AppComponent {
    constructor() {
    }
}

