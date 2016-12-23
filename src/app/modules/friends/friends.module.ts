import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {FriendsCom} from './friends.component';
import {FriendsSvc} from './friends.service';

@NgModule({
  declarations: [FriendsCom],
  imports: [IonicModule.forRoot(FriendsCom)],
  exports:[FriendsCom],
  providers: [FriendsSvc]
})
export class FriendsModule {}
