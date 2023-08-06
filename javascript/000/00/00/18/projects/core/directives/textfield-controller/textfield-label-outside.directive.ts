import {Directive, forwardRef, InjectionToken, Input} from '@angular/core';
import {AbstractTuiController} from '@taiga-ui/cdk';

export const TUI_TEXTFIELD_LABEL_OUTSIDE =
    new InjectionToken<TuiTextfieldLabelOutsideDirective>(
        `[TUI_TEXTFIELD_LABEL_OUTSIDE]: tuiTextfieldLabelOutside`,
        {
            factory: () => new TuiTextfieldLabelOutsideDirective(),
        },
    );

@Directive({
    selector: `[tuiTextfieldLabelOutside]`,
    providers: [
        {
            provide: TUI_TEXTFIELD_LABEL_OUTSIDE,
            useExisting: forwardRef(() => TuiTextfieldLabelOutsideDirective),
        },
    ],
})
export class TuiTextfieldLabelOutsideDirective extends AbstractTuiController {
    @Input(`tuiTextfieldLabelOutside`)
    labelOutside = false;
}
