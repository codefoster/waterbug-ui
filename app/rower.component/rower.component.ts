import { Component, Input } from 'angular2/core';
import { StrokeGraphComponent } from '../stroke-graph.component/stroke-graph.component';
import { RaceService } from '../race.service/race.service';

@Component({
    selector: 'rower',
    templateUrl: 'app/rower.component/rower.component.html',
    directives: [StrokeGraphComponent],
    styleUrls: ['app/rower.component/rower.component.css']
})
export class RowerComponent {
    @Input() public rower: any;
    
    constructor(private raceService: RaceService) {
    }

}