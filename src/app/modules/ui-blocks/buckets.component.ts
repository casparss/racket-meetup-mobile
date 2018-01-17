import { Component } from '@angular/core';

@Component({
  selector: 'buckets',
  template: `
    <dl>
      <ng-content></ng-content>
    </dl>
  `
})
export class BucketsCom {}
