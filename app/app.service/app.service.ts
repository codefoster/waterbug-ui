import { Injectable } from 'angular2/core';

@Injectable()
export class AppService {
    public state;

    constructor() {
        this.state = {
            raceDistance: null,
            startTime: null,
            rowers: [
                {
                    name: 'jeremy',
                    strokeRates: [24.5, 24.0, 25.5, 26.0, 25.5],
                    caloriesPerMinute: 78,
                    distance: 99
                },
                {
                    name: 'daniel',
                    strokeRates: [24.5, 24.0, 25.5, 26.0, 25.5],
                    caloriesPerMinute: 78,
                    distance: 300
                }
            ]
        }
    }
}