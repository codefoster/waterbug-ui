import { Component, Input } from 'angular2/core';
import { AppService } from '../app.service/app.service';

@Component({
    selector: 'rower',
    templateUrl: 'app/rower.component/rower.component.html',
    styleUrls: ['app/rower.component/rower.component.css']
})
export class Rower {
    @Input() public rower: any;
    public raceDistance;
    private socket;

    constructor(appService: AppService) {
         this.raceDistance = appService.state.raceDistance;
    }
}