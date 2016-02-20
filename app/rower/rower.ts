import { Component } from 'angular2/core';
import { AppService } from '../app.service/app.service';

@Component({
    selector: 'rower',
    inputs: ['rower'],
    templateUrl: 'app/rower/rower.html',
    styleUrls:['app/rower/rower.css']
})
export class Rower {
    public rower: any;
    public raceDistance;
    
    constructor(appService:AppService){
        this.raceDistance = appService.state.raceDistance;
    }
}
//