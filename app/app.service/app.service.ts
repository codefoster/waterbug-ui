import { Injectable } from 'angular2/core';

@Injectable()
export class AppService {
    public state;

    constructor() {
        this.state = {
            raceDistance: 500,
            rowers: [
                {
                    name: 'jeremy',
                    strokeRates: [24.5, 24.0, 25.5, 26.0, 25.5],
                    caloriesPerMinute: 78,
                    distance: 99,
                    elapsedTime: 73423
                },
                {
                    name: 'daniel',
                    strokeRates: [24.5, 24.0, 25.5, 26.0, 25.5],
                    caloriesPerMinute: 78,
                    distance: 300,
                    elapsedTime: 73423
                }
            ]
        }
    }
}