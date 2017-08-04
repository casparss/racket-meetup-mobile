import { DataModel } from '../../utils/data-model';
import { ModelSvc } from '../model-service/model.service';
import * as moment from 'moment';
import { forEach } from 'lodash';

export class GameModel extends DataModel {
  private modelSvc: ModelSvc;
  public side1: any;
  public side2: any;
  public participants: Array<any>; //userModels

  constructor(injector, gameModel, ownerInstance, opts?){
    super(injector, gameModel, ownerInstance);
    this.modelSvc = injector.get(ModelSvc);
    this.subscribe();
    this.setUpParticpantsMeta(gameModel);
  }

  setUpParticpantsMeta({ opponents: { side1, side2 }}){
    this.side1 = this.modelSvc.create(side1[0].user, this);
    this.side2 = this.modelSvc.create(side2[0].user, this);
    this.participants = [this.side1, this.side2];
  }

  get $(){
    return super.get$()
      .map(game => {
        game.date = moment(game.date);
        return game;
      });
  }

  destroy(){
    super.destroy();
    this.side1.disown();
    this.side2.disown();
  }

  getParticipantById(_id:string){
    return this.participants.find(userModel => userModel._id === _id);
  }
}
