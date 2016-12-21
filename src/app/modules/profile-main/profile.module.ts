import {NgModule} from '@angular/core';
import {ProfileActionsCom} from './profile-actions.component'
import {AvailabilityModule} from '../availability/availability.module';
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
    ProfileMainCom
  ],
  imports: [AvailabilityModule],
  exports: [ProfileMainCom],
  providers: [ProfileMainSvc, UserSvc]
})
export class ProfileModule {}
