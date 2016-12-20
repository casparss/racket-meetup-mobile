import {Injectable, KeyValueDiffers} from '@angular/core';
import Promise from "ts-promise";
import {map, filter} from 'lodash';
import {CollectionDiff} from './collection-diff';

@Injectable()
export class ColObjDifferFactory{

	private differs: Array<any>;

	constructor(private keyValueDiffers: KeyValueDiffers){}

	create(collectionObject){
		return new CollectionObjectDiffer(collectionObject, this.keyValueDiffers);
	}

}

export class CollectionObjectDiffer{

	private differs: Array<any>;

	constructor(
		collectionObject: any,
		private keyValueDiffers: KeyValueDiffers
	){		
		this.attachDiffers(collectionObject);
	}

	private attachDiffers(collectionObject){
		this.differs = map(collectionObject, (collection: Array<any>) => {
			return new CollectionDiff(collection, this.keyValueDiffers);
		});
	}

	diff(){		
		return new Promise((resolve, reject) => {
			if(this.differs){

				Promise.all(map(this.differs, (differ:any) => differ.diff()))
					.then(
						changes => resolve(changes),
						err => reject(err)
					);				

	  		}
	  		else {
	  			reject(new Error("No diff."));
	  		}
		});
	}

}