import {Component, Input} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {ChatSvc} from './chat.service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
	templateUrl: './chat.view.html',
	providers: [ChatSvc]
})
export class ChatCom{

	private chatMessages$:any;
	private sendMessageForm: FormGroup;

	constructor(
		private svc:ChatSvc,
		private formBuilder: FormBuilder,
		private params: NavParams
	){
		this.chatMessages$ = svc.chatMessages$;
		this.svc.setChatId(this.params.get("id"));
		this.sendMessageForm = this.formBuilder.group({
			messageInput: ['', [<any>Validators.required]]
		});
	}

	sendMessage(messageForm){
		let message = <string>messageForm.value.messageInput;
		if(message !== ""){
			this.svc.sendMessage(messageForm.value.messageInput);
			this.clearInput();
		}
	}

	clearInput(){
		// clear messageInput field
	}

	ngOnDestroy(){
		this.svc.destroy();
	}

}
