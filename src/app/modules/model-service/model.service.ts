import { Injectable, Injector, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WsSvc } from '../web-sockets-service/web-sockets.service';
import { UserUtils } from '../user-service/user.utils';
import { UserModelSvc } from '../user-service/user.model.service';
import { DataModel } from '../../utils/data-model'
import { UserModel } from '../user-service/user.model';
import { GameModel } from '../games/game.model';
import { RankingModel } from '../rankings-list/ranking.model';
import { mapValues, findIndex, remove } from 'lodash';

export const USER = 'User';
export const GAME = 'Game';
export const RANKING = 'Ranking';

const MODEL_TYPES = {
  [USER]: UserModel,
  [GAME]: GameModel,
  [RANKING]: RankingModel
};

const modelRegistry = mapValues(MODEL_TYPES, () => []);

const create = (injector, rawData: any, ownerInstance: any) => {
  let { modelType } = rawData;

  if(!modelType) throw new Error("No model type property on object");
  let ModelType = MODEL_TYPES[modelType];
  if(!ModelType) throw new Error("No model type provided for model creation!");

  let collection = modelRegistry[modelType];
  let preExistingModel = collection.find(model => model._id === rawData._id);

  if(preExistingModel){
    preExistingModel.update(rawData, ownerInstance);
    return preExistingModel;
  } else {
    let newModel =  new ModelType(injector, rawData, ownerInstance);
    collection.push(newModel);
    return newModel;
  }
}

@Injectable()
export class ModelSvc {
  private deps: any;
  constructor(private injector: Injector){}

  create(rawData: any, ownerInstance?: any){
    return create(this.injector, rawData, ownerInstance)
  }

  createCollection(type: string, objectArray: Array<any> = []){
    let collection = new Collection(type, this.injector, objectArray);
    collection.onDestroy.subscribe(type => this.cleanUpRedundentModels(type));
    return collection;
  }

  cleanUpRedundentModels(type){
    remove(modelRegistry[type], model => model.isOwnerlessDestroy());
  }
}

let id = 0;

class Collection {
  public id: number;
  public onDestroy = new EventEmitter();
  private collectionSubject: BehaviorSubject<any>;
  private $: Observable<any>;

  constructor(public type: string, private injector, objectArray = []){
    this.id = id++;
    this.collectionSubject = new BehaviorSubject(this.transformToModel(objectArray));
    this.$ = this.collectionSubject.asObservable();
  }

  unshift(model){
    let games = this.collectionSubject.getValue();
    games.unshift(model);
    this.collectionSubject.next(games);
  }

  update(objectArray){
    this.collectionSubject.next(this.transformToModel(objectArray));
  }

  findById(_idArg){
    return this.collectionSubject.getValue().find(({ _id }) => _id === _idArg);
  }

  destroy(){
    let games = this.collectionSubject.getValue();
    games.forEach(gameModel => gameModel.disown(this));
    this.onDestroy.emit(this.type);
    this.onDestroy.unsubscribe();
  }

  transformToModel(objectArray = []){
    let ModelType = MODEL_TYPES[this.type];
    return !(objectArray[0] instanceof MODEL_TYPES[this.type]) ?
      objectArray.map(object => create(this.injector, object, this)):
      objectArray;
  }
}
