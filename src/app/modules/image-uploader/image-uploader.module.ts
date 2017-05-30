import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ImageUploaderDrv } from './image-uploader.directive';

@NgModule({
  declarations: [ImageUploaderDrv],
  imports: [IonicModule],
  exports:[ImageUploaderDrv]
})
export class ImageUploaderModule {}
