'use strict';

import { Observable } from 'rxjs/Observable';

export class Utils {

  public static promiseCatchHandler(err: Error): void {
    console.error('ERROR - An error has occurred inside a promise! ' + err);
    // throw the error out to the console - http://stackoverflow.com/a/30741722
    setTimeout(function(): void { throw err; });
  }

  public static observable = {
    error : (errMessage:string) => {
      return new Observable(observer => observer.error(new Error(errMessage)));
    },

    success : (data:any) => {
      return new Observable(observer => observer.next(data));
    }
  }
}

export const toPromise = (observable$: Observable<any>) => {
  return new Promise<any>((resolve, reject) =>
    observable$.subscribe(
      value => resolve(value),
      err => reject(err)
    )
  );
};
