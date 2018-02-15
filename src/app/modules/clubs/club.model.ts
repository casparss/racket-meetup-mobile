import { DataModel } from '../../utils/data-model';
import { ModelSvc } from '../model-service/model.service';
import { ClubsSvc } from './clubs.service';
import { ClubsUtils } from './clubs.utils';
import * as moment from 'moment';

export class ClubModel extends DataModel {
  private modelSvc: ModelSvc;
  private clubsSvc: ClubsSvc;
  private utils: ClubsUtils;

  constructor(injector, clubModel, ownerInstance, opts?){
    super(injector, clubModel, ownerInstance);
    this.modelSvc = injector.get(ModelSvc);
    this.utils = injector.get(ClubsUtils);
    this.subscribe();
  }

  get image(){
    return this.utils.generateBannerImgUrl(this._.photo);
  }
}
