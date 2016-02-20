System.register(['angular2/core', '../app.service/app.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, app_service_1;
    var Rower;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            }],
        execute: function() {
            Rower = (function () {
                function Rower(appService) {
                    this.raceDistance = appService.state.raceDistance;
                }
                Rower = __decorate([
                    core_1.Component({
                        selector: 'rower',
                        inputs: ['rower'],
                        templateUrl: 'app/rower/rower.html',
                        styleUrls: ['app/rower/rower.css']
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService])
                ], Rower);
                return Rower;
            })();
            exports_1("Rower", Rower);
        }
    }
});
// 
//# sourceMappingURL=rower.js.map