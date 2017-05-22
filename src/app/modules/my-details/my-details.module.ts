import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MydetailsCom} from './my-details.component';
import {LoadingImgModule} from '../../utils/loading-img';

@NgModule({
  declarations: [MydetailsCom],
  imports: [LoadingImgModule, IonicModule],
  exports:[MydetailsCom]
})
export class MydetailsModule {}
