import { Component, provide } from "angular2/core";
// import { RaceComponent } from "../race.component/race.component";
import { SocketService } from "../socket.service/socket.service";

@Component({
    selector: "app",
    templateUrl: "app/app.component/app.component.html",
    // directives: [RaceComponent],
    styleUrls: ["app/app.component/app.component.css"],
})
export class AppComponent {
    constructor(private socketService:SocketService){
        this.socketService.send('{"message":"hi"}');
    }
}

