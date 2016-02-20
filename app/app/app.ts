import {bootstrap} from 'angular2/platform/browser';
import { Component, provide } from "angular2/core";
import {
    Router,
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy
} from "angular2/router";

import { Rower } from "../rower/rower";
import { AppService } from "../app.service/app.service"
import { SocketService } from "../socket.service/socket.service"
import { HTTP_PROVIDERS } from "angular2/http";

@Component({
    selector: "app",
    templateUrl: 'app/app/app.html',
    directives: [ROUTER_DIRECTIVES, Rower],
    providers: [HTTP_PROVIDERS],
    styleUrls: ['app/app/app.css']
})

// Configure the routes for the app
// NOTE: this app doesn't actually even need a router or any of this routing code, but I'm leaving it in here for reference
@RouteConfig([
    // { path: "<path>", component: <component>, name: "<name>" }
    // { path: "<path>", component: <component>, name: "<name>" }
])

export class App {
    constructor(private socketService: SocketService, private appService: AppService) {
        socketService.initialize();
        // socket.emit('msg', 'hello from the client');

        // socket.on('news', function(data) {
        //     console.log(data);
        //     socket.emit('my other event', { my: 'data' });
        // });
        
    }

    //this is how to do conditional navigation (though I don't need to at this point)
    // myfunction(router:Router) {
    //     //router.navigate(["/"]);
    // }
}

bootstrap(App, [SocketService, AppService, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);