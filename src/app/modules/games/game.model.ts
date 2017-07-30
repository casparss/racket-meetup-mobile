import { DataModel } from '../../utils/data-model';
import { ModelSvc } from '../model-service/model.service';
import * as moment from 'moment';
import { forEach } from 'lodash';

export class GameModel extends DataModel {
  private modelSvc: ModelSvc;
  public side1: any;
  public side2: any;

  constructor(injector, userModel, ownerInstance, opts?){
    super(injector, userModel, ownerInstance);
    this.modelSvc = injector.get(ModelSvc);
    this.subscribe();
  }

  get $(){
    return super.get$()
      .map(game => {
        game.date = moment(game.date);
        return game;
      })
      .do(game => {
        this.side1 = this.modelSvc.create(game.opponents.side1[0].user, this);
        this.side2 = this.modelSvc.create(game.opponents.side2[0].user, this);
      });
  }

  destroy(){
    super.destroy();
    this.side1.disown();
    this.side2.disown();
  }
}
