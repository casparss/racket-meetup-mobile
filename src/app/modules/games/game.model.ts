import { DataModel } from '../../utils/data-model';
import * as moment from 'moment';

export class GameModel extends DataModel {
  constructor(injector, userModel){
    super(injector, userModel);
  }

  get $(){
    return super.get$()
      .map(game => {
        game.date = moment(game.date);
        return game;
      });
  }
}
