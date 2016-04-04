import {bootstrap} from 'angular2/platform/browser';
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
        // socket.emit('msg', 'hello from the client');

        var socket = io("http://cf.ngrok.io");

        //NOTE: I don't like how I'm having to pass the appService to the other function here
        this.startRace();

        //this emits a stroke to the server
        //this would normally be done on each actual stroke of the machine        
        socket.emit("stroke", {
            name: 'jeremy',
            strokeRate: 23, //note that this is only a _single_ stroke rate value
            caloriesPerMinute: 78,
            distance: 99
        });
        
        //handle a stroke message
        socket.on("stroke", function(data) {
            //update our app state with the new message
            //will require adding the stroke rate to the user's array
            console.log(JSON.stringify(appService.state));
        });
    }

    startRace() {
        // appService.state.startTime = moment();
        console.log('|' + this.appService.state.startTime + '|')
    }
}

bootstrap(App, [AppService]);