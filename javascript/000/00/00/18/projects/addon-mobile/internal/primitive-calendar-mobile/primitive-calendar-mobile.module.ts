import {NgModule} from '@angular/core';
import {TuiRippleModule} from '@taiga-ui/addon-mobile/directives/ripple';
import {TuiLetModule, TuiRepeatTimesModule} from '@taiga-ui/cdk';
import {TuiCalendarSheetPipeModule} from '@taiga-ui/core';

import {TuiPrimitiveCalendarMobileComponent} from './primitive-calendar-mobile.component';

/**
 * @internal
 */
@NgModule({
    imports: [
        TuiRepeatTimesModule,
        TuiCalendarSheetPipeModule,
        TuiRippleModule,
        TuiLetModule,
    ],
    declarations: [TuiPrimitiveCalendarMobileComponent],
    exports: [TuiPrimitiveCalendarMobileComponent],
})
export class TuiPrimitiveCalendarMobileModule {}
