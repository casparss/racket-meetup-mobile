import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class ToastSvc {
	private eventEmitter = new EventEmitter();
	public onMessage = handler => this.eventEmitter.subscribe(handler);
	public showMessage = (message:string, duration?:number) => {
		this.eventEmitter.emit({
			message: message,
			duration: duration
		});
	};
}