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
      let weekCommencing = `w/c ${date.format('Do MMMM')}`;
      let label = CUSTOM_LABELS[i] ? CUSTOM_LABELS[i] : weekCommencing;
      let selected;
      weeks[i] = { label, date, selected };
    }

    return weeks;
  }

  //@TODO: Currently having to add on a sday to get the last day to be Sunday,
  //@TODO: apparently you can use ISO format which will be Sunday as the last day
  //@TODO: without tweaking and messing with it
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

}
