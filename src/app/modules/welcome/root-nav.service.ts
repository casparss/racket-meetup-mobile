import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';

@Injectable()
export class RootNavSvc {
  public nav: NavController;
  set(nav:NavController){
    this.nav = nav;
  }
}
