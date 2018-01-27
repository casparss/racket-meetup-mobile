import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClubCom } from './club.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';

@Component({
  selector: 'my-clubs',
  template: `
    <no-data-message>Add the clubs you regularly play at to this list for easy access. A list of your local clubs will be on the 'Local clubs' tab.</no-data-message>
  `
})
export class MyClubsCom {
  constructor(private clubsSvc: ClubsSvc){}
}
