import { Component, Input } from '@angular/core';
import { RaceService } from '../race.service/race.service';

@Component({
    selector: 'value-graph',
    templateUrl: 'app/value-graph.component/value-graph.component.html',
    styleUrls: ['app/value-graph.component/value-graph.component.css']
})
export class ValueGraphComponent {
    @Input() public values: number[];
    @Input() public omitOutliers: boolean = true;
    get displayValues() {
        if(this.omitOutliers)
            return this.values;
        else {
            return this.values.filter((v,i) => {
                let lastvalue = (i > 0 ? this.values[i-1] : 0);
                return Math.abs(1-v/lastvalue) < 0.3;
            })
        }
    }

    constructor(private raceService: RaceService) {
        
    }

    displayHeight(value: number): string {
        let max = 0;
        this.values.forEach(sr => max = Math.max(max, sr));
        return Math.round(100 * value / max) + '%';
    }
}