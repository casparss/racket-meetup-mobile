import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { BucketsCom } from './buckets.component';

@NgModule({
  declarations: [
    BucketsCom
  ],
  imports: [
    IonicModule
  ],
  exports: [
    BucketsCom
  ],
  providers: []
})
export class UIBlocksModule {}
