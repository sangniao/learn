import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiDataListModule} from '@taiga-ui/core';
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiInputModule,
} from '@taiga-ui/kit';

import {TuiFilterByInputExample1} from './examples/1';
import {TuiFilterByInputExample2} from './examples/2';
import {TuiFilterByInputExample3} from './examples/3';
import {ExampleTuiFilterByInputComponent} from './filter-by-input.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiFilterByInputPipeModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiComboBoxModule,
        RouterModule.forChild(tuiGenerateRoutes(ExampleTuiFilterByInputComponent)),
    ],
    declarations: [
        ExampleTuiFilterByInputComponent,
        TuiFilterByInputExample1,
        TuiFilterByInputExample2,
        TuiFilterByInputExample3,
    ],
    exports: [ExampleTuiFilterByInputComponent],
})
export class ExampleTuiFilterByInputModule {}
