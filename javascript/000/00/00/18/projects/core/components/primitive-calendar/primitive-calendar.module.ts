import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    TuiHoveredModule,
    TuiLetModule,
    TuiMapperPipeModule,
    TuiPressedModule,
    TuiRepeatTimesModule,
} from '@taiga-ui/cdk';
import {
    TuiCalendarSheetPipeModule,
    TuiOrderWeekDaysPipeModule,
} from '@taiga-ui/core/pipes';

import {TuiPrimitiveCalendarComponent} from './primitive-calendar.component';

@NgModule({
    imports: [
        CommonModule,
        TuiLetModule,
        TuiMapperPipeModule,
        TuiRepeatTimesModule,
        TuiHoveredModule,
        TuiPressedModule,
        TuiCalendarSheetPipeModule,
        TuiOrderWeekDaysPipeModule,
    ],
    declarations: [TuiPrimitiveCalendarComponent],
    exports: [TuiPrimitiveCalendarComponent],
})
export class TuiPrimitiveCalendarModule {}
