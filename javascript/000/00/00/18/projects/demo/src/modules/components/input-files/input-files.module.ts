import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiLinkModule,
    TuiNotificationModule,
    TuiSvgModule,
} from '@taiga-ui/core';
import {
    TuiFieldErrorPipeModule,
    TuiFilesModule,
    TuiInputFilesModule,
} from '@taiga-ui/kit';

import {TuiInputFilesExample1} from './examples/1';
import {TuiInputFilesExample2} from './examples/2';
import {TuiInputFilesExample3} from './examples/3';
import {TuiInputFilesExample4} from './examples/4';
import {TuiInputFilesExample5} from './examples/5';
import {TuiInputFilesExample6} from './examples/6';
import {ExampleTuiInputFilesComponent} from './input-files.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiFilesModule,
        TuiInputFilesModule,
        TuiAddonDocModule,
        TuiLinkModule,
        TuiButtonModule,
        TuiSvgModule,
        RouterModule.forChild(tuiGenerateRoutes(ExampleTuiInputFilesComponent)),
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiNotificationModule,
    ],
    declarations: [
        ExampleTuiInputFilesComponent,
        TuiInputFilesExample1,
        TuiInputFilesExample2,
        TuiInputFilesExample3,
        TuiInputFilesExample4,
        TuiInputFilesExample5,
        TuiInputFilesExample6,
    ],
    exports: [ExampleTuiInputFilesComponent],
})
export class ExampleTuiFilesModule {}
