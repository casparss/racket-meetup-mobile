import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {FollowersCom} from './followers.component';

@NgModule({
  declarations: [FollowersCom],
  imports: [IonicModule.forRoot(FollowersCom)],
  exports:[FollowersCom]
})
export class FollowersModule {}
