import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'no-data-message',
  template: `
    <div class="message">
      <ng-content></ng-content>
    </div>
  `
})
export class NoDataMessageCom {
  @Input() message: string;
}
