import { Component, Output, EventEmitter, ElementRef } from '@angular/core';
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
        [disabled]="!(ws.connected$ | async) || messageInput === ''"
        (mousedown)="stopDefaultBehaviour($event)"
        (mouseup)="stopDefaultBehaviour($event)"
        (touchup)="stopDefaultBehaviour($event)"
        (touchmove)="stopDefaultBehaviour($event)"
        (touchstart)="stopDefaultBehaviour($event)"
        (touchdown)="stopDefaultBehaviour($event)"
        (touchend)="send($event)"
      ><ion-icon name="send"></ion-icon></button>
    </div>
  `
})
export class TextDialogueCom {
  @Output() sendMessage: EventEmitter<string> = new EventEmitter();
  private messageInput: string = '';

  constructor(
    private ws: WsSvc,
    private elementRef: ElementRef
  ){}

  send($event){
    this.sendMessage.emit(this.messageInput);
    this.messageInput = '';
    this.stopDefaultBehaviour($event);
  }

  /**
   * This is a hack to stop the textarea losing focus and the keyboard closing
   * when the user taps the send button. Tested on IOS and seems to work, needs
   * to be called on practically every kind of touch event to actually work!
   * @param  {Event} $event standard DOM event object
   */
  stopDefaultBehaviour($event){
    $event.preventDefault();
    $event.stopPropagation();
  }

  blur(){
    this.elementRef.nativeElement
      .querySelector('textarea')
      .blur();
  }

}
