import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProfileMenuCom } from './profile-menu.component';
import { LoadingImgModule } from '../../utils/loading-img/';

@NgModule({
  declarations: [
    ProfileMenuCom
  ],
  imports: [
    IonicModule,
    LoadingImgModule
  ],
  entryComponents: [
    ProfileMenuCom
  ],
  exports: [
    ProfileMenuCom
  ]
})
export class ProfileMenuModule {}
