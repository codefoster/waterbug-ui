import { Injectable } from 'angular2/core';
import * as _ from 'lodash';

@Injectable()
export class AppService {
    public _state;

    constructor() {
        this._state = {
            raceDistance: null,
            startTime: null,
            rowers: []
        }
    }
    
    get state() {
        return this._state;
    }
    
    getRank(name:string) {
        let rankedRowers = this._state.rowers.order(r => r.distance);
        return rankedRowers.findIndex(r => r.name == name) + 1;
    }
    
}