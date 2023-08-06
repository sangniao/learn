import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {TuiLinearMultiPickerComponent} from './linear-multi-picker.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TuiLinearMultiPickerComponent],
    exports: [TuiLinearMultiPickerComponent],
})
export class TuiLinearMultiPickerModule {}
