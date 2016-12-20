'use strict';

import {URLSearchParams} from '@angular/http';
import {forEach} from 'lodash';

export class HttpUtils {

	public static urlParams(paramsObj: Object){		
		let params: URLSearchParams = new URLSearchParams();
		forEach(paramsObj, (val, key) => {
			params.set(key, val);
		});
		return params;	
	}

}