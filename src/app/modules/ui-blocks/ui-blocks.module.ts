import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { BucketsCom } from './buckets.component';
import { LoadingBlockCom } from './loading-block.component';

const components = [
  BucketsCom,
  LoadingBlockCom
];

@NgModule({
  declarations: components,
  imports: [IonicModule],
  exports: components,
  providers: []
})
export class UIBlocksModule {}
