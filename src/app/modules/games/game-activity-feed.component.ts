import { Component, Input } from '@angular/core';
import { GameModel } from './game.model';
import * as moment from 'moment';
import calendarDateConfig from '../../utils/calendar-date-config.json';

const ACTIVITY_TYPE_ICONS = [
  "create",
  "close",
  "checkmark",
  "settings",
  "calendar",
  "pin",
  "trophy",
  "chatboxes"
];

@Component({
  selector: 'game-activity-feed',
  template: `
    <ul>
      <li *ngFor="let activity of activities">
        <div class="icon-container">
          <div class="icon-wrapper">
            <ion-icon [name]="getActivityIconName(activity.activityType)"></ion-icon>
          </div>
        </div>

        <div class="details-container">
          <ion-chip>
            <ion-avatar>
              <img [src]="getUserAvatar$(activity.userId) | async">
            </ion-avatar>
            <ion-label>{{getUserName(activity.userId)}}</ion-label>
          </ion-chip>

          <div class="description" [ngSwitch]="activity.activityType">
            <span *ngSwitchCase="0">
              created a game
            </span>

            <span *ngSwitchCase="1">
              forfeited
            </span>

            <span *ngSwitchCase="2">
              accepted game request
            </span>

            <span *ngSwitchCase="3">
              changed the game to {{activity.gameTypeTo}} (was {{activity.gameTypeFrom}})
            </span>

            <span *ngSwitchCase="4">
              changed the date to {{activity.dateTo}} (was {{activity.dateFrom}})
            </span>

            <span *ngSwitchCase="5">
              changed the location of the match to {{activity.venueTo}} (was {{activity.venueFrom}})
            </span>

            <span *ngSwitchCase="6">
              recorded the score
            </span>

            <span *ngSwitchCase="7">
              commented: "{{activity.comment}}"
            </span>
          </div>

          <span class="date">{{activity.createdAt}}</span>
        </div>

      </li>
      <div class="vertical-line"></div>
    </ul>
  `
})
export class GameActivityFeedCom {
  private activities: any;
  @Input() gameModel: GameModel;
  constructor(){}

  ngOnInit(){
    this.gameModel.$
      .map(game => game.activity)
      .map(activities => activities.map(activity => {
        let activityCopy = Object.assign({}, activity);
        activityCopy.createdAt = moment(activity.createdAt).calendar(null, calendarDateConfig);
        return activityCopy;
      }))
      .subscribe(activities => this.activities = activities);
  }

  getUserAvatar$(_id:string){
    return this.gameModel.getParticipantById(_id).avatar$;
  }

  getUserName(_id:string){
    return this.gameModel.getParticipantById(_id).getValue().details.fullName;
  }

  getActivityIconName(activityType){
    return `${ACTIVITY_TYPE_ICONS[activityType]}-outline`;
  }

}
