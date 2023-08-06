// src/app/core/services/media-match.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MediaQueriesMap, MediaQueryType } from 'src/app/types';

// media queries list
export const MEDIA_QUERIES: MediaQueriesMap[] = [
  {
    _type: 'prefers-reduced-motion',
    _query: '(prefers-reduced-motion: reduce)',
  },
];

@Injectable({ providedIn: 'root' })
export class MediaMatchService {
  private _mediaQueryListeners!: {
    [key in MediaQueryType]: BehaviorSubject<boolean>;
  };
  public mediaQueryListeners$!: {
    [key in MediaQueryType]: Observable<boolean>;
  };

  constructor() {
    MEDIA_QUERIES.forEach((mq) => this.matchMedia(mq));
  }

  private matchMedia(mq: MediaQueriesMap) {
    this._mediaQueryListeners = {
      ...this._mediaQueryListeners,
      [mq._type]: new BehaviorSubject<boolean>(false),
    };

    this.mediaQueryListeners$ = {
      ...this.mediaQueryListeners$,
      [mq._type]: this._mediaQueryListeners[mq._type].asObservable(),
    };

    const mediaQueryList = window.matchMedia(mq._query);
    console.log(mediaQueryList.matches);

    this._mediaQueryListeners[mq._type].next(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', (ev: MediaQueryListEvent) => {
      console.log('changed', ev.matches);
      this._mediaQueryListeners[mq._type].next(ev.matches);
    });
  }
}
