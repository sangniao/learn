import {InjectionToken} from '@angular/core';
import {TuiDayOfWeek} from '@taiga-ui/cdk';

export const TUI_FIRST_DAY_OF_WEEK = new InjectionToken<TuiDayOfWeek>(
    `[TUI_FIRST_DAY_OF_WEEK]: The first day of the week index`,
    {
        factory: () => TuiDayOfWeek.Monday,
    },
);
