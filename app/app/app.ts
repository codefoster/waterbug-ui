import { bootstrap } from 'angular2/platform/browser';
import { Component, provide } from "angular2/core";
import { Rower } from "../rower/rower";
import { AppService } from "../app.service/app.service"
import { HTTP_PROVIDERS } from "angular2/http";

@Component({
    selector: "app",
    templateUrl: 'app/app/app.html',
    directives: [Rower],
    providers: [HTTP_PROVIDERS],
    styleUrls: ['app/app/app.css']
})
export class App {
    
    constructor(private appService: AppService) {
        var socket = io("http://cf.ngrok.io");

        //NOTE: I don't like how I'm having to pass the appService to the other function here
        this.startRace();

        //handle a stroke message
        socket.on("stroke", function(data) {
            //update our app state with the new message
            //will require adding the stroke rate to the user's array
            console.log(JSON.stringify(data));
        });
    }

    startRace() {
        // appService.state.startTime = moment();
        console.log('|' + this.appService.state.startTime + '|')
    }
}

bootstrap(App, [AppService]);