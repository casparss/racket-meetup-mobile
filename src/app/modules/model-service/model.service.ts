import { Events } from 'ionic-angular';
import { Injectable, Injector, EventEmitter } from '@angular/core';
import { mapValues, remove, forEach, last, isArray, findKey } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../user-service/user.model';
import { GameModel } from '../games/game.model';
import { RankingModel } from '../rankings/ranking.model';
import { ChatModel } from '../chat/chat.model';
import { ClubModel } from '../clubs/club.model';

export const USER = 'User';
export const GAME = 'Game';
export const RANKING = 'Ranking';
export const CHAT = 'Chat';
export const CLUB = 'Club';

export const MODEL_TYPES = {
  [USER]: UserModel,
  [GAME]: GameModel,
  [RANKING]: RankingModel,
  [CHAT]: ChatModel,
  [CLUB]: ClubModel
};

const isType = (inst, name) => inst instanceof MODEL_TYPES[name];

export const isModelType = (modelInstance, modelName) => {
  if(typeof modelName === 'string') {
    return isType(modelInstance, modelName)
  }
  else if(isArray(modelName)) {
    return !!modelName.find(name => isType(modelInstance, name));
  }
  else {
    throw Error('Model name arg does not match compatible type!');
  }
}

export const modelName = model =>
  findKey(MODEL_TYPES, modelType => model instanceof modelType)

const modelRegistry = mapValues(MODEL_TYPES, () => []);

const create = (injector, rawData: any, ownerInstance: any, opts) => {
  let { modelType } = rawData;

  if(!modelType) throw new Error("No model type property on object");
  let ModelType = MODEL_TYPES[modelType];
  if(!ModelType) throw new Error("No model type provided for model creation!");

  let registry = modelRegistry[modelType];
  let preExistingModel = registry.find(model => model._id === rawData._id);

  if(preExistingModel){
    preExistingModel.update(rawData, ownerInstance);
    return preExistingModel;
  } else {
    let newModel = new ModelType(injector, rawData, ownerInstance, opts);
    registry.push(newModel);
    return newModel;
  }
}

@Injectable()
export class ModelSvc {
  private deps: any;
  constructor(private injector: Injector, private events: Events){
    this.events.subscribe("logout", () => this.destroyModels());
  }

  create(rawData: any, ownerInstance: any, opts = {}){
    return create(this.injector, rawData, ownerInstance, opts)
  }

  createCollection(type: string, opts = {}){
    let collection = new Collection(type, this.injector, opts);
    collection.onDestroy.subscribe(type => this.cleanUpRedundentModels(type));
    return collection;
  }

  cleanUpRedundentModels(type){
    remove(modelRegistry[type], model => model.isOwnerlessDestroy());
  }

  destroyModels(){
    forEach(modelRegistry, (value, key) => {
      value.forEach(value => value.destroy());
      modelRegistry[key] = [];
    });
  }
}

let id = 0;

export class Collection {
  public id: number;
  public onDestroy = new EventEmitter();
  private collectionSubject: BehaviorSubject<any>;
  private $: Observable<any>;
  private opts: any;

  constructor(public type: string, private injector, opts){
    this.id = id++;
    this.opts = opts;
    this.collectionSubject = new BehaviorSubject(this.transformToModel(opts.data ? opts.data : []));
    this.$ = this.collectionSubject.asObservable();
  }

  unshift(model){
    let models = this.collectionSubject.getValue();
    models.unshift(model);
    this.collectionSubject.next(models);
  }

  last(){
    let models = this.collectionSubject.getValue();
    return last(models);
  }

  update(objectArray){
    this.collectionSubject.next(this.transformToModel(objectArray));
    return this;
  }

  appendArray(objectArray: Array<any>){
    let models = this.collectionSubject.getValue();
    let newModels = this.transformToModel(objectArray);
    this.collectionSubject.next([...models, ...newModels]);
  }

  push(value: any){
    let models = this.collectionSubject.getValue();
    let newModels = this.transformToModel([value]);
    this.collectionSubject.next([...models, ...newModels]);
  }

  findById(_idArg){
    return this.collectionSubject.getValue().find(({ _id }) => _id === _idArg);
  }

  remove(idForRemoval){
    let models = this.collectionSubject.getValue();
    remove(models, ({_id}) => _id === idForRemoval);
    this.collectionSubject.next([...models]);
  }

  destroy(){
    let models = this.collectionSubject.getValue();
    models.forEach(model => model.disown(this));
    this.onDestroy.emit(this.type);
    this.onDestroy.unsubscribe();
  }

  transformToModel(objectArray = []){
    let ModelType = MODEL_TYPES[this.type];
    return !(objectArray[0] instanceof MODEL_TYPES[this.type]) ?
      objectArray.map(object => create(this.injector, object, this, this.opts)):
      objectArray;
  }

  get length(){
    return this.collectionSubject.getValue().length;
  }
}
