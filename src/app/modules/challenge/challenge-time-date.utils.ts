import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { extendMoment } from 'moment-range';
const _moment = extendMoment(moment);

@Injectable()
export class ChallengeTimeDateUtils {

  get weeks(){
    const CUSTOM_LABELS = ['This week', 'Next week', 'Week after next'];
    let weeks = [];

    for(let i = 0; i < 16 ; i++){
      let date = moment().day(1).add(i, 'week');
      let weekCommencing = `W/C Monday ${date.format('Do MMMM')}`;
      let label = CUSTOM_LABELS[i] ? CUSTOM_LABELS[i] : weekCommencing;
      let selected;
      let disabled = true;
      weeks[i] = { label, date, selected, disabled };
    }

    return weeks;
  }

  //@TODO: Currently only handling UK/European week period i.e. Mon - Sun
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
