import { Component } from '@ionic/angular'


@Component({
  template: `
  <ion-list class="ranking-board">
    <ion-item *ngFor="let rankingModel of (rankingsList.$ | async); let i=index;">
      <ion-item [class.active]="rankingModel.user._id === userSvc.current._id">
        <ion-grid>
          <ion-row>
            <ion-col class="position" col-1>{{i + 1 }}
            </ion-col>

            <ion-col class="img" col-2>
              <loading-img [src]="rankingModel.user.avatar$ | async"></loading-img>
            </ion-col>

            <ion-col class="name" col-7>{{rankingModel.user.getValue().details.fullName}}
            </ion-col>

            <ion-col class="ranking" col-2>{{rankingModel.user.getValue().stats.wins}}<br />
              <span>Wins</span>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    </ion-item>
  </ion-list>
  `,
  selector:'rankings-list'
})
export class RankingsListCom {}
