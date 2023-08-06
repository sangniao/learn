import {ElementRef, Inject, Injectable} from '@angular/core';
import {TuiZoom, TuiZoomOptions} from '@taiga-ui/cdk/interfaces';
import {tuiPreventDefault, tuiTypedFromEvent} from '@taiga-ui/cdk/observables';
import {TUI_ZOOM_OPTIONS} from '@taiga-ui/cdk/tokens';
import {tuiDistanceBetweenTouches} from '@taiga-ui/cdk/utils';
import {merge, Observable} from 'rxjs';
import {filter, map, scan, switchMap, takeUntil} from 'rxjs/operators';

const TOUCH_SENSITIVITY = 0.01;

@Injectable()
export class TuiZoomService extends Observable<TuiZoom> {
    constructor(
        @Inject(ElementRef) {nativeElement}: ElementRef<HTMLElement>,
        @Inject(TUI_ZOOM_OPTIONS) {wheelSensitivity}: TuiZoomOptions,
    ) {
        super(subscriber => {
            merge(
                tuiTypedFromEvent(nativeElement, `touchstart`, {passive: true}).pipe(
                    filter(({touches}) => touches.length > 1),
                    switchMap(startEvent =>
                        tuiTypedFromEvent(nativeElement, `touchmove`, {
                            passive: true,
                        }).pipe(
                            tuiPreventDefault(),
                            scan(
                                (prev, event) => {
                                    const distance = tuiDistanceBetweenTouches(event);

                                    return {
                                        event,
                                        distance,
                                        delta:
                                            (distance - prev.distance) *
                                            TOUCH_SENSITIVITY,
                                    };
                                },
                                {
                                    event: startEvent,
                                    distance: tuiDistanceBetweenTouches(startEvent),
                                    delta: 0,
                                },
                            ),
                            map(({event, delta}) => {
                                const clientX =
                                    (event.touches[0].clientX +
                                        event.touches[1].clientX) /
                                    2;
                                const clientY =
                                    (event.touches[0].clientY +
                                        event.touches[1].clientY) /
                                    2;

                                return {clientX, clientY, delta, event};
                            }),
                            takeUntil(tuiTypedFromEvent(nativeElement, `touchend`)),
                        ),
                    ),
                ),
                tuiTypedFromEvent(nativeElement, `wheel`, {passive: false}).pipe(
                    tuiPreventDefault(),
                    map(wheel => ({
                        clientX: wheel.clientX,
                        clientY: wheel.clientY,
                        delta: -wheel.deltaY * wheelSensitivity,
                        event: wheel,
                    })),
                ),
            ).subscribe(subscriber);
        });
    }
}
