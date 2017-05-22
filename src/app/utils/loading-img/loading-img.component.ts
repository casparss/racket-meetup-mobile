import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-img',
  template: `
    <ion-spinner *ngIf="isLoading" icon="spiral" class="spinner-stable"></ion-spinner>
    <img [hidden]="isLoading" (load)="onLoad()" src="{{src}}" />
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img { -webkit-transform: translateZ(0); width:100%!important; height:100%!important; }
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
