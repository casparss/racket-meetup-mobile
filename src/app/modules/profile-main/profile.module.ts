import {NgModule} from '@angular/core';
import {ProfileActionsCom} from './profile-actions.component'
import {AvailabilityCom} from '../availability/availability.component';
import {GamesCom} from '../games/games.component';
import {ProfileHeaderCom} from './profile-header.component';
import {ProfileMainSvc} from './profile-main.service';
import {ProfileMainCom} from './profile-main.component';
import {UserSvc} from '../user-service/user.service';

@NgModule({
  declarations: [
    ProfileHeaderCom,
    ProfileActionsCom,
    GamesCom,
    AvailabilityCom,
    ProfileMainCom
  ],
  exports: [ProfileMainCom],
  providers: [ProfileMainSvc, UserSvc]
})
export class ProfileModule {}
