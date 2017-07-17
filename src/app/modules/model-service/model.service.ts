import { Injectable, Injector, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WsSvc } from '../web-sockets-service/web-sockets.service';
import { UserUtils } from '../user-service/user.utils';
import { UserModelSvc } from '../user-service/user.model.service';
import { DataModel } from '../../utils/data-model'
import { UserModel } from '../user-service/user.model';
import { GameModel } from '../games/game.model';
import { mapValues, findIndex, remove } from 'lodash';

export const USER = 'User';
export const GAME = 'Game';

const MODEL_TYPES = {
  [USER]: UserModel,
  [GAME]: GameModel
};

const modelRegistry = mapValues(MODEL_TYPES, () => []);
const collectionRegistry = mapValues(MODEL_TYPES, () => []);

@Injectable()
export class ModelSvc {
  private deps: any;
  constructor(private injector: Injector){}

  create(model: any){
    try {
      let ModelType = MODEL_TYPES[model.modelType];
      if(!ModelType) throw new Error("No model type provided for model creation!");
      var modelInstance = new ModelType(this.injector, model);
    }
    catch(err){
      console.error(err);
    }
    return this.brokerModel(modelInstance);
  }

  private brokerModel(modelInstance){
    let collection = modelRegistry[modelInstance.type];
    let incumbentModel = collection.find(model => model._id === modelInstance._id);

    if(incumbentModel){
      incumbentModel.update(modelInstance);
      return incumbentModel;
    } else {
      collection.push(modelInstance);
      return modelInstance;
    }
  }

  createCollection(type: string, objectArray: Array<any> = []){
    let collection = new Collection(type, this.injector, objectArray);
    collection.onDestroy.subscribe(id => this.destroyCollection(type, collection));
    collectionRegistry[type].push(collection);
    return collection;
  }

  private destroyCollection(type, collection){
    collection.onDestroy.unsubscribe();
    let componentCollectionsByType = collectionRegistry[type];
    let i = findIndex(componentCollectionsByType, ({ id }) => id === collection.id);
    componentCollectionsByType.splice(i, 1);
    this.cleanUpRedundentModels(type);
  }

  cleanUpRedundentModels(type){
    //@TODO: needs to be a check for permanent models so the logged-in user doesn't get removed
    let componentCollections = collectionRegistry[type];
    remove(modelRegistry[type], model => {
      let isScheduled = !componentCollections.find(collection => collection.findById(model._id));
      if(isScheduled) model.destroy();
      return isScheduled;
    });
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
    this.collectionSubject.getValue().find(({ _id }) => _id === _idArg);
  }

  destroy(){
    this.onDestroy.emit(this.id);
  }

  transformToModel(objectArray){
    let ModelType = MODEL_TYPES[this.type];
    return !(objectArray[0] instanceof MODEL_TYPES[this.type]) ?
      objectArray.map(object => new ModelType(this.injector, object)):
      objectArray;
  }
}
