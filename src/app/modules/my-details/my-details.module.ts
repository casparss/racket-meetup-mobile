import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MydetailsCom} from './my-details.component';

@NgModule({
  declarations: [MydetailsCom],
  imports: [IonicModule],
  exports:[MydetailsCom]
})
export class MydetailsModule {}
