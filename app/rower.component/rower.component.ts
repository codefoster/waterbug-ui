import { Component, Input } from '@angular/core';
import { ValueGraphComponent } from '../value-graph.component/value-graph.component';
import { RaceService } from '../race.service/race.service';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'rower',
    templateUrl: 'app/rower.component/rower.component.html',
    directives: [ValueGraphComponent],
    styleUrls: ['app/rower.component/rower.component.css']
})
export class RowerComponent {
    @Input() public rower: any;
    private rowingSequence:Observable<string>;
    private rowingSequenceSubscription:Subscription;
    rowerImageUrl: string = '/app/rower.component/assets/rower1-1.png';

    constructor(private raceService: RaceService) {
        this.raceService.strokedata$.filter(s => s.name == this.rower.name).subscribe(d => {
            if(this.rowingSequenceSubscription) this.rowingSequenceSubscription.unsubscribe();
            if(this.rower.distance >= this.raceService.raceDistance) {
                this.rowerImageUrl = `/app/rower.component/assets/rower1-win.png`;
            }
            else {
                this.rowingSequence = Observable.interval(200).take(6).map(n => `/app/rower.component/assets/rower1-${n}.png`);
                this.rowingSequenceSubscription = this.rowingSequence.subscribe(value => this.rowerImageUrl = value);
            }                
            
        })
    }
}