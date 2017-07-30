import { DataModel } from '../../utils/data-model';
import { ModelSvc } from '../model-service/model.service';

export class RankingModel extends DataModel {
  private modelSvc: ModelSvc;
  public user: any;
  public position: number;
  private faux_id: number;

  constructor(injector, userModel, ownerInstance, opts?){
    super(injector, userModel, ownerInstance);
    this.modelSvc = injector.get(ModelSvc);
    this.faux_id = Math.floor(Math.random() * 10000000000);
    this.subscribe();
  }

  get $(){
    return super.get$()
      .do(({ position }) => this.position = position)
      .do(({ user }) => this.user = this.modelSvc.create(user, this));
  }

  destroy(){
    super.destroy();
    this.user.disown();
  }

  get _id(){
    return this.faux_id;
  }
}
