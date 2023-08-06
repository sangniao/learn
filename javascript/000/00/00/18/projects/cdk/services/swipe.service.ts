import {DOCUMENT} from '@angular/common';
import {ElementRef, Inject, Injectable} from '@angular/core';
import {TuiSwipe, TuiSwipeOptions} from '@taiga-ui/cdk/interfaces';
import {tuiTypedFromEvent} from '@taiga-ui/cdk/observables';
import {TUI_SWIPE_OPTIONS} from '@taiga-ui/cdk/tokens';
import {tuiGetSwipeDirection, tuiIsPresent} from '@taiga-ui/cdk/utils/miscellaneous';
import {merge, Observable} from 'rxjs';
import {filter, map, pairwise} from 'rxjs/operators';

@Injectable()
export class TuiSwipeService extends Observable<TuiSwipe> {
    constructor(
        @Inject(ElementRef) {nativeElement}: ElementRef<Element>,
        @Inject(TUI_SWIPE_OPTIONS) {timeout, threshold}: TuiSwipeOptions,
        @Inject(DOCUMENT) documentRef: Document,
    ) {
        super(subscriber => {
            merge(
                tuiTypedFromEvent(nativeElement, `touchstart`, {passive: true}),
                tuiTypedFromEvent(documentRef, `touchend`),
            )
                .pipe(
                    pairwise(),
                    filter(
                        ([first, second]) =>
                            !!first.touches.length &&
                            first.touches[0].identifier ===
                                second.changedTouches[0].identifier,
                    ),
                    map(([start, end]) => {
                        const startX = start.touches[0].clientX;
                        const startY = start.touches[0].clientY;
                        const endX = end.changedTouches[0].clientX;
                        const endY = end.changedTouches[0].clientY;

                        const distanceX = startX - endX;
                        const distanceY = startY - endY;
                        const duration = end.timeStamp - start.timeStamp;

                        if (
                            (Math.abs(distanceX) > threshold ||
                                Math.abs(distanceY) > threshold) &&
                            duration < timeout
                        ) {
                            return {
                                direction: tuiGetSwipeDirection(distanceX, distanceY),
                                events: [start, end] as [TouchEvent, TouchEvent],
                            };
                        }

                        return null;
                    }),
                    filter(tuiIsPresent),
                )
                .subscribe(subscriber);
        });
    }
}
