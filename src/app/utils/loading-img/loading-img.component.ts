import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'loading-img',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="spinner-container" *ngIf="isLoading">
      <ion-spinner icon="spiral" class="spinner-stable"></ion-spinner>
    </div>
    <div class="img-container">
      <img [class.loaded]="!isLoading" (load)="onLoad()" [src]="src" />
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .img-container {
      z-index: 1;
    }
    .spinner-container {
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 2;
    }
    img {
      -webkit-transform: translateZ(0) scale(0.6);
      transform: translateZ(0) scale(0.6);
      filter: opacity(0);
      transition: filter 1s, transform 0.4s;
      transition-timing-function: ease-in-out;
      width:100%!important;
      height:100%!important;
    }
    .loaded {
      -webkit-transform: translateZ(0) scale(1);
      transform: translateZ(0) scale(1);
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
