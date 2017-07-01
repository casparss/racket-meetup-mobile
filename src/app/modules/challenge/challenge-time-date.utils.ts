import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { extendMoment } from 'moment-range';
const _moment = extendMoment(moment);

@Injectable()
export class ChallengeTimeDateUtils {

  public periods = [{
    name: 'Morning',
    range: {
      min: "05:00",
      max: "11:00"
    },
  },
  {
    name: 'Afternoon',
    range: {
      min: "12:00",
      max: "17:00"
    },
  },
  {
    name: 'Evening',
    range: {
      min: "18:00",
      max: "23:00"
    }
  }];

  get weeks(){
    const CUSTOM_LABELS = ['This week', 'Next week', 'Week after next'];
    let weeks = [];

    for(let i = 0; i < 16 ; i++){
      let date = moment().day(1).add(i, 'week');

      let label = CUSTOM_LABELS[i] ?
        CUSTOM_LABELS[i]:
        `w/c ${date.format('Do MMMM')}`;

      weeks[i] = { label, date };
    }

    return weeks;
  }

  days(wcDate){
    let weDate = moment(wcDate).day(6).add(1, "day");
    let entireWeek = Array.from(_moment.range(wcDate, weDate).by('days'));
    let today = moment();

    return entireWeek.map((date:any) => ({
      date: date,
      label: date.format("dddd"),
      disabled: date.isBefore(today)
    }));
  }

  generateDate({ day, time }){
    let [hours, minutes] = time.split(":");
    return moment(day).hours(hours).minutes(minutes);
  }

}
