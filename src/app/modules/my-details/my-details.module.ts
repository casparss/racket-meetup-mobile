import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MydetailsCom } from './my-details.component';
import { LoadingImgModule } from '../../utils/loading-img';
import { ImageUploaderModule } from '../image-uploader';
import { ChangePasswordCom } from './change-password.component';


@NgModule({
  declarations: [MydetailsCom, ChangePasswordCom],
  entryComponents: [ChangePasswordCom],
  imports: [IonicModule, LoadingImgModule, ImageUploaderModule],
  exports:[MydetailsCom]
})
export class MydetailsModule {}
