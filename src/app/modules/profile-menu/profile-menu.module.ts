import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProfileMenuCom } from './profile-menu.component';

@NgModule({
  declarations: [
    ProfileMenuCom
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    ProfileMenuCom
  ],
  exports: [
    ProfileMenuCom
  ]
})
export class ProfileModule {}
