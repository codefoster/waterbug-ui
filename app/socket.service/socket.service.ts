import { Injectable } from 'angular2/core';

@Injectable()
export class SocketService {
    constructor() {
        
    }
    initialize() {
        var socket = io('http://localhost:8080');
        
    }
}