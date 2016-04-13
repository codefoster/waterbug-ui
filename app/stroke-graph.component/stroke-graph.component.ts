import { Component, Input } from 'angular2/core';
import { RaceService } from '../race.service/race.service';

@Component({
    selector: 'stroke-graph',
    templateUrl: 'app/stroke-graph.component/stroke-graph.component.html',
    styleUrls: ['app/stroke-graph.component/stroke-graph.component.css']
})
export class StrokeGraphComponent {
    @Input() public strokeRates: number[];
        
    constructor(private raceService: RaceService) {
    }
}