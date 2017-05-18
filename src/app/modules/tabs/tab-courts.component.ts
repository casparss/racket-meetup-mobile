import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  template:
	`<ion-content class="courts-tab"></ion-content>`
})
export class CourtsTab {
  constructor(private navController: NavController) {}
};
