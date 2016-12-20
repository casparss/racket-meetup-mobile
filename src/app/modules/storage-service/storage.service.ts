'use strict';

import {SqlStorage} from 'ionic-angular';

export class StorageSvc {

	private storage: SqlStorage;

	constructor() {
		this.storage = new SqlStorage();
	}

	public get(key: string): Promise<{}> {
		return this.storage.get(key);
	}

	public set(key: string, value: string): Promise<{}> {
		return this.storage.set(key, value);
	}

	public remove(key: string): Promise<{}> {
		return this.storage.remove(key);
	}

}