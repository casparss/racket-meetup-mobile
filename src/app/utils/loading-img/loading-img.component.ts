import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-img',
  template: `
    <ion-spinner *ngIf="isLoading" icon="spiral" class="spinner-stable"></ion-spinner>
    <img *ngIf="isLoading" src="/assets/isLoading.gif" alt="loading" />
    <img class="{{className}}" [hidden]="loading" (load)="onLoad()" src="{{src}}" />
  `
})
export class LoadingImg {
  private isLoading: boolean;
  @Input() src: string;
  @Input() className: string
  onLoad(){ this.isLoading = false; }
  ngOnChanges(){
    console.log(arguments);
    this.isLoading = true;
  }
}
