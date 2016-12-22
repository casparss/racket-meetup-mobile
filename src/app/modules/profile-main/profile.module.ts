import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {ProfileActionsCom} from './profile-actions.component'
import {AvailabilityModule} from '../availability/availability.module';
import {GamesCom} from '../games/games.component';
import {ProfileHeaderCom} from './profile-header.component';
import {ProfileMainSvc} from './profile-main.service';
import {ProfileMainCom} from './profile-main.component';
import {UserSvc} from '../user-service/user.service';

@NgModule({
  declarations: [
    ProfileMainCom,
    ProfileActionsCom,
    ProfileHeaderCom,
    GamesCom,
  ],
  imports: [
    IonicModule.forRoot(ProfileMainCom),
    IonicModule.forRoot(ProfileActionsCom),
    IonicModule.forRoot(ProfileHeaderCom),
    IonicModule.forRoot(GamesCom),
    AvailabilityModule
  ],
  exports: [
    ProfileMainCom
  ],
  providers: [ProfileMainSvc]
})
export class ProfileModule {}
