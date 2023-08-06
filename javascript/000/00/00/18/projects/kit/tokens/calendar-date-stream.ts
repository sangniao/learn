import {InjectionToken, Optional, Provider, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {TuiControlValueTransformer, TuiDay, TuiDayRange} from '@taiga-ui/cdk';
import {tuiControlValueFactory} from '@taiga-ui/kit/utils';
import {Observable} from 'rxjs';

export const TUI_CALENDAR_DATE_STREAM = new InjectionToken<
    Observable<TuiDay | TuiDayRange | null>
>(`[TUI_CALENDAR_DATE_STREAM]: Stream that emits calendar data change`);

export function tuiDateStreamWithTransformer(
    transformer: InjectionToken<TuiControlValueTransformer<any>>,
): Provider {
    return {
        provide: TUI_CALENDAR_DATE_STREAM,
        deps: [
            [new Optional(), new Self(), NgControl],
            [new Optional(), transformer],
        ],
        useFactory: tuiControlValueFactory,
    };
}
