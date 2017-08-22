import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameModel } from './game.model';
import * as moment from 'moment';
import calendarDateConfig from '../../utils/calendar-date-config.json';
import GAME_TYPES from './game-types.json';

const ACTIVITY_TYPE_ICONS = [
  "create",
  "close",
  "checkmark",
  "settings",
  "calendar",
  "pin",
  "trophy",
  "chatboxes",
  "clock"
];

@Component({
  selector: 'game-activity-feed',
  template: `
    <ul>
      <li *ngFor="let activity of activities">
        <div class="icon-container">
          <div class="icon-wrapper">
            <ion-icon color="white" [name]="getActivityIconName(activity.activityType)"></ion-icon>
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
              created a game request
            </span>

            <span *ngSwitchCase="1">
              forfeited
            </span>

            <span *ngSwitchCase="2">
              accepted game request
            </span>

            <span *ngSwitchCase="3">
              changed the game to <span class="emphasise">{{activity.gameTypeTo}}</span> from {{activity.gameTypeFrom}}
            </span>

            <span *ngSwitchCase="4">
              changed the date to <span class="emphasise">{{activity.dateTo}}</span> from {{activity.dateFrom}}
            </span>

            <span *ngSwitchCase="5">
              changed the location of the match to <span class="emphasise">{{activity.venueTo}}</span> from {{activity.venueFrom}}
            </span>

            <span *ngSwitchCase="6">
              recorded the score
            </span>

            <span *ngSwitchCase="7">
              commented: "{{activity.comment}}"
            </span>

            <span *ngSwitchCase="8">
              changed the time to <span class="emphasise">{{activity.dateTo}}</span> from {{activity.dateFrom}}
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
  private gameModelSub: Subscription;
  @Input() gameModel: GameModel;
  constructor(){}

  ngOnInit(){
    this.gameModelSub = this.gameModel.$
      .map(game => game.activity)
      .map(activities => activities.map(activity => {
        let activityCopy = Object.assign({}, activity);
        activityCopy.createdAt = moment(activity.createdAt).fromNow();

        if(activityCopy.activityType === 3){
          activityCopy.gameTypeFrom = this.getGameTypeName(activityCopy.gameTypeFrom);
          activityCopy.gameTypeTo = this.getGameTypeName(activityCopy.gameTypeTo);
        }

        if(activityCopy.activityType === 4){
          activityCopy.dateFrom = moment(activityCopy.dateFrom).format("ddd Mo MMM YYYY");
          activityCopy.dateTo = moment(activityCopy.dateTo).format("ddd Mo MMM YYYY");
        }

        if(activityCopy.activityType === 8){
          activityCopy.dateFrom = moment(activityCopy.dateFrom).format("HH:mm");
          activityCopy.dateTo = moment(activityCopy.dateTo).format("HH:mm");
        }

        return activityCopy;
      }))
      .map(activities => activities.reverse())
      .subscribe(activities => this.activities = activities);
  }

  ionViewDidUnload(){
    this.gameModelSub.unsubscribe();
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

  getGameTypeName(typeCode){
    return GAME_TYPES[typeCode];
  }

}
