import { Component, Input } from '@angular/core';

@Component({
  selector: 'ranking-avatar',
  template: `
  <loading-img [src]="image"></loading-img>
  <div class="position">{{position}}</div>
  `
})
export class RankingAvatarCom {
  @Input() image: string;
  @Input() position: number;
}
