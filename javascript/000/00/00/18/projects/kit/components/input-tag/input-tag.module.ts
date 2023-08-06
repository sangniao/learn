import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
    TuiActiveZoneModule,
    TuiFocusableModule,
    TuiHoveredModule,
    TuiScrollService,
} from '@taiga-ui/cdk';
import {
    TuiHostedDropdownModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiTooltipModule,
    TuiWrapperModule,
} from '@taiga-ui/core';
import {TuiTagModule} from '@taiga-ui/kit/components/tag';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';

import {TuiInputTagComponent} from './input-tag.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PolymorpheusModule,
        TuiFocusableModule,
        TuiHoveredModule,
        TuiActiveZoneModule,
        TuiSvgModule,
        TuiScrollbarModule,
        TuiTooltipModule,
        TuiHostedDropdownModule,
        TuiTagModule,
        TuiWrapperModule,
    ],
    providers: [TuiScrollService],
    declarations: [TuiInputTagComponent],
    exports: [TuiInputTagComponent],
})
export class TuiInputTagModule {}
