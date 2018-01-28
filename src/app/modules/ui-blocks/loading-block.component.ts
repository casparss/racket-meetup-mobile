import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-block',
  template: `
    <ion-spinner [class.none]="!loading" icon="spiral" class="spinner-stable"></ion-spinner>
    <div [class.none]="loading">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    :host > ion-spinner {
        display: block;
        margin: 10px auto;
    }
  `]
})
export class LoadingBlockCom {
  @Input() loading: boolean;
}
