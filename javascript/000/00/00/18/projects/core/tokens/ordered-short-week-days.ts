/**
 * TODO: v4.0 delete the whole file
 */
import {inject, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {TUI_FIRST_DAY_OF_WEEK} from './first-day-of-week';
import {TUI_SHORT_WEEK_DAYS} from './i18n';

/**
 * @deprecated
 */
export type WEEK_DAYS_NAMES = [string, string, string, string, string, string, string];

const convertToSundayFirstWeekFormat = (
    weekDaysNames: WEEK_DAYS_NAMES,
): WEEK_DAYS_NAMES => {
    const sundayIndex = weekDaysNames.length - 1;

    return [
        weekDaysNames[sundayIndex],
        ...weekDaysNames.slice(0, sundayIndex),
    ] as WEEK_DAYS_NAMES;
};

/**
 * @deprecated
 */
export const TUI_ORDERED_SHORT_WEEK_DAYS = new InjectionToken<
    Observable<WEEK_DAYS_NAMES>
>(`[TUI_ORDERED_SHORT_WEEK_DAYS]: Ordered calendars i18n texts`, {
    factory: () => {
        const firstDayOfWeekIndex = inject(TUI_FIRST_DAY_OF_WEEK);

        return inject(TUI_SHORT_WEEK_DAYS).pipe(
            map(convertToSundayFirstWeekFormat),
            map(
                weekDays =>
                    [
                        ...weekDays.slice(firstDayOfWeekIndex),
                        ...weekDays.slice(0, firstDayOfWeekIndex),
                    ] as WEEK_DAYS_NAMES,
            ),
        );
    },
});
