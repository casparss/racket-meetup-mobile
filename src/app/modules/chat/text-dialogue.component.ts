import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { WsSvc } from '../web-sockets-service';

const ENTER_KEY = 13;

@Component({
  selector: 'text-dialogue',
  template: `
    <textarea
      #textarea
      (keyup)="returnKeySend($event)"
      [(ngModel)]="messageInput"
      [disabled]="!(ws.connected$ | async)"
      type="text"
      placeholder="Your message"
      name="sendMessage"></textarea>

    <div class="msg-send">
      <button
        [disabled]="!(ws.connected$ | async)"
        ion-button
        (mousedown)="send($event)">Send</button>
    </div>
  `
})
export class TextDialogueCom {
  @ViewChild('textarea') textarea;
  @Output() sendMessage: EventEmitter<string> = new EventEmitter();
  private messageInput: string;
  constructor(private ws: WsSvc){}

  returnKeySend($event){
    if($event.which === ENTER_KEY) this.send();
  }

  send(){
    this.sendMessage.emit(this.messageInput);
    this.messageInput  = "";
  }

}
