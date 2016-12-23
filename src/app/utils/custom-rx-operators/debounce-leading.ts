import {Observable} from 'rxjs';
import {debounce} from 'lodash';

interface DebounceLeadingSignature<T> {
  <R>(time: number): Observable<R>;
}

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debounceLeading: DebounceLeadingSignature<T>;
  }
}

Observable.prototype.debounceLeading = function(time: number){

  return Observable.create(subscriber => {

    const debouce = debounce(
      data => {
        subscriber.next(data)
      }, time, { leading: true }
    );

    return this.subscribe(
      value => {
        try {
          debouce(value);
        } catch(err) {
          subscriber.error(err);
        }
      },
      err => subscriber.error(err),
      () => subscriber.complete()
    );

  });

};
