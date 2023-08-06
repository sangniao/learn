import { Observable, of, Subject } from "rxjs";
import { delay, mergeAll, shareReplay, switchMap, tap } from "rxjs/operators";

interface IHttpCacheStorage {
  setItem(key: string, item: Observable<any>): void;
  getItem(key: string): Observable<any> | undefined;
}

interface IHttpCacheOptions {
  storage: IHttpCacheStorage;
  refreshSubject: Observable<unknown> | Subject<unknown>;
}

type HttpRequestCacheMethod = (...args: any[]) => Observable<any>;

export function HttpRequestCache<T extends Record<string, any>>(
  optionsHandler: (this: T) => IHttpCacheOptions
) {
  return (
    target: T,
    methodName: string,
    descriptor: TypedPropertyDescriptor<HttpRequestCacheMethod>
  ): TypedPropertyDescriptor<HttpRequestCacheMethod> => {
    if (!(descriptor?.value instanceof Function)) {
      throw Error(`'@HttpRequestCache' can be applied only to the class method which returns Observable`);
    }
  
    const cacheKeyPrefix = `${target.constructor.name}_${methodName}`;
    const originalMethod = descriptor.value;
  
    descriptor.value = function (...args: any[]): Observable<any> {
      const { storage, refreshSubject } = optionsHandler.call(this, this);

      const key = `${cacheKeyPrefix}_${JSON.stringify(args)}`;
      let observable = storage.getItem(key);
  
      if (observable) {
        return observable;
      }
  
      observable = of(
        originalMethod.apply(this, args),
        refreshSubject.pipe(switchMap(() => originalMethod.apply(this, args)))
      ).pipe(mergeAll(), shareReplay(1));
  
      storage.setItem(key, observable);
  
      return observable;
    };
  
    return descriptor;
  }
}