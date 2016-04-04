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
        // socket.emit('msg', 'hello from the client');

        var socket = io("http://cf.ngrok.io");

        //NOTE: I don't like how I'm having to pass the appService to the other function here
        this.startRace();

        //this emits 5 strokes to the server
        //this would normally be done on each actual stroke of the machine
        let distance = 0;
        for (var i = 0; i < 5; i++) {
            socket.emit("stroke", {
                name: 'jeremy',
                strokeRate: (Math.random() * 5) + 20,
                caloriesPerMinute: (Math.random() * 10) + 70,
                distance: distance += (Math.random()) 
            });
        }

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