System.register(['angular2/platform/browser', "angular2/core", "../rower/rower", "../app.service/app.service", "../socket.service/socket.service", "angular2/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, rower_1, app_service_1, socket_service_1, http_1;
    var App;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rower_1_1) {
                rower_1 = rower_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(socketService, appService) {
                    this.socketService = socketService;
                    this.appService = appService;
                    socketService.initialize();
                    // socket.emit('msg', 'hello from the client');
                    // socket.on('news', function(data) {
                    //     console.log(data);
                    //     socket.emit('my other event', { my: 'data' });
                    // });
                }
                App = __decorate([
                    core_1.Component({
                        selector: "app",
                        templateUrl: 'app/app/app.html',
                        directives: [rower_1.Rower],
                        providers: [http_1.HTTP_PROVIDERS],
                        styleUrls: ['app/app/app.css']
                    }), 
                    __metadata('design:paramtypes', [socket_service_1.SocketService, app_service_1.AppService])
                ], App);
                return App;
            })();
            exports_1("App", App);
            browser_1.bootstrap(App, [socket_service_1.SocketService, app_service_1.AppService]);
        }
    }
});
//# sourceMappingURL=app.js.map