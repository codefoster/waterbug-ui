import { Component, Input } from '@angular/core';
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

    displayHeight(value: number): string {
        let max = 0;
        this.strokeRates.forEach(sr => max = Math.max(max, sr));
        return Math.round(100 * value / max) + '%';
    }
}