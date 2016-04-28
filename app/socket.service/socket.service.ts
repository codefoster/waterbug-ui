import * as io from 'socket.io-client'
import {Observable, Subject} from 'rxjs/Rx'
import {Injectable} from 'angular2/core'

export class SocketConfig {
	url: string;
}

@Injectable()
export class SocketService {
	messages: Observable<any>
	_socket: SocketIOClient.Socket;
	_messageQueue: any[] = [];
    
	constructor(config:SocketConfig){
		let socket:SocketIOClient.Socket;
		let messageQueue = this._messageQueue;
		this.messages = Observable.create(messageObserver => {
			socket = this._socket = io.connect(config.url);
			socket.on('message', m => messageObserver.next(m));
			socket.on('connect', () => this._flushMessageQueue());
        });
    }
    
	private _flushMessageQueue(){
		let messageQueue = this._messageQueue;
		while(messageQueue.length > 0 && this._socket.connected){
			console.log('sending message');
			this.send(messageQueue.shift())
		}

	}
    
	listen(eventName){
		return this.messages.filter(message => message.action === eventName);
	}
    
	send(message){
		this._socket.send(message);
	}
}

