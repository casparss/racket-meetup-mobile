import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'loading-img',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-spinner *ngIf="isLoading" icon="spiral" class="spinner-stable"></ion-spinner>
    <img [class.loaded]="!isLoading" (load)="onLoad()" [src]="src" />
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      filter: opacity(0);
      transition: all 0.5s;
      width:100%!important;
      height:100%!important;
    }
    .loaded {
      -webkit-transform: translateZ(0) scale(1);
      transform: translateZ(0);
      filter: opacity(1);
    }
  `]
})
export class LoadingImg {
  private isLoading: boolean;
  @Input() src: string;
  onLoad(){
    this.isLoading = false;
  }
  ngOnChanges(){
    this.isLoading = true;
  }
}
