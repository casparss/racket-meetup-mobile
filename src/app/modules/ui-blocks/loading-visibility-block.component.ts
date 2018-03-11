import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-visibility-block',
  template: `
    <ion-spinner [class.none]="!loading" icon="spiral" class="spinner-stable"></ion-spinner>
    <div [class.invisible]="loading">
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
    :host .invisible {
      filter: opacity(0);
    }
  `]
})
export class LoadingVisibilityBlockCom {
  @Input() loading: boolean;
}
