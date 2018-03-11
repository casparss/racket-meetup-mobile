import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { BucketsCom } from './buckets.component';
import { LoadingBlockCom } from './loading-block.component';
import { LoadingVisibilityBlockCom } from './loading-visibility-block.component';

const components = [
  BucketsCom,
  LoadingBlockCom,
  LoadingVisibilityBlockCom
];

@NgModule({
  declarations: components,
  imports: [IonicModule],
  exports: components,
  providers: []
})
export class UIBlocksModule {}
