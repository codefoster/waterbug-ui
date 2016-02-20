import {bootstrap} from 'angular2/platform/browser';
import { Component, provide } from "angular2/core";
import { Rower } from "../rower/rower";
import { AppService } from "../app.service/app.service"
import { SocketService } from "../socket.service/socket.service"
import { HTTP_PROVIDERS } from "angular2/http";

@Component({
    selector: "app",
    templateUrl: 'app/app/app.html',
    directives: [Rower],
    providers: [HTTP_PROVIDERS],
    styleUrls: ['app/app/app.css']
})

export class App {
    constructor(private socketService: SocketService, private appService: AppService) {
        socketService.initialize();
        // socket.emit('msg', 'hello from the client');

        // socket.on('news', function(data) {
        //     console.log(data);
        //     socket.emit('my other event', { my: 'data' });
        // });
        
    }
}

bootstrap(App, [SocketService, AppService]);