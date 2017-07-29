import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WsSvc } from '../web-sockets-service';

@Component({
  selector: 'text-dialogue',
  template: `
    <textarea
      [(ngModel)]="messageInput"
      [disabled]="!(ws.connected$ | async)"
      type="text"
      placeholder="Your message"
      name="sendMessage"></textarea>

    <div class="msg-send">
      <button
        ion-button
        [disabled]="!(ws.connected$ | async)"
        (mousedown)="send($event)">Send</button>
    </div>
  `
})
export class TextDialogueCom {
  @Output() sendMessage: EventEmitter<string> = new EventEmitter();
  private messageInput: string;
  constructor(private ws: WsSvc){

  }

  send($event){
    this.sendMessage.emit(this.messageInput);
    this.messageInput  = "";
  }
}
