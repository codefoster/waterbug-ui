import { Component, Input } from '@angular/core';
import { StrokeGraphComponent } from '../stroke-graph.component/stroke-graph.component';
import { RaceService } from '../race.service/race.service';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'rower',
    templateUrl: 'app/rower.component/rower.component.html',
    directives: [StrokeGraphComponent],
    styleUrls: ['app/rower.component/rower.component.css']
})
export class RowerComponent {
    @Input() public rower: any;
    private rowingSequence:Observable<string>;
    private rowingSequenceSubscription:Subscription;
    rowerImageUrl: string = '/app/rower.component/assets/rower-1.png';

    constructor(private raceService: RaceService) {
        this.raceService.strokes$.filter(s => s.name == this.rower.name).subscribe(d => {
            if(this.rowingSequenceSubscription) this.rowingSequenceSubscription.unsubscribe();
            if(this.rower.distance >= this.raceService.raceDistance) {
                this.rowerImageUrl = `/app/rower.component/assets/rower-yay.png`;
            }
            else {
                this.rowingSequence = Observable.interval(200).take(5).map(n => `/app/rower.component/assets/rower-${n}.png`);
                this.rowingSequenceSubscription = this.rowingSequence.subscribe(value => this.rowerImageUrl = value);
            }                
            
        })
    }
}