import {Injectable, KeyValueDiffers} from '@angular/core';
import {map, filter, isEmpty} from 'lodash';

export class CollectionDiff {

	private collection:Array<any>;
	private objDiffer:any = {};
	private differ:KeyValueDiffers;

	constructor(collectionArg: Array<any>, differsArg: KeyValueDiffers){
		this.differ = differsArg;
		this.collection = collectionArg;
		this.setUpWatch();
	}

	private setUpWatch(){

		this.collection.forEach((obj, index) =>{
  			this.objDiffer[index] = this.differ.find(obj).create(null);
  		});

	}

	diff(){

		return new Promise( (resolve, reject) => {

			let changedMap: Array<any> = filter(map(this.collection, (obj, index) => {

				let objDiffer = this.objDiffer[index];
	  			let objChanges = objDiffer.diff(obj);
	  			let changedResultArr = [];

	  			if(objChanges){

	  				objChanges.forEachChangedItem(changedObj => {
	  					changedResultArr.push(changedObj);
	  				});

	  			}

	  			return isEmpty(changedResultArr) ? null : changedResultArr;

	  		}));

        resolve(changedMap);

		});

	}

}
