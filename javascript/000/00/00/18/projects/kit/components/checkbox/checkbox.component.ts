import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
    AbstractTuiNullableControl,
    tuiAsControl,
    tuiAsFocusableItemAccessor,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
    tuiIsNativeFocused,
} from '@taiga-ui/cdk';
import {TUI_CHECKBOX_OPTIONS, TuiCheckboxOptions, TuiSizeL} from '@taiga-ui/core';

@Component({
    selector: `tui-checkbox`,
    templateUrl: `./checkbox.template.html`,
    styleUrls: [`./checkbox.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAsFocusableItemAccessor(TuiCheckboxComponent),
        tuiAsControl(TuiCheckboxComponent),
    ],
})
export class TuiCheckboxComponent
    extends AbstractTuiNullableControl<boolean>
    implements TuiFocusableElementAccessor
{
    @ViewChild(`focusableElement`)
    private readonly focusableElement?: ElementRef<HTMLInputElement>;

    @Input()
    @HostBinding(`attr.data-size`)
    @tuiDefaultProp()
    size: TuiSizeL = this.options.size;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(TUI_CHECKBOX_OPTIONS)
        private readonly options: TuiCheckboxOptions,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
    ) {
        super(control, changeDetectorRef);
    }

    get nativeFocusableElement(): HTMLInputElement | null {
        return !this.focusableElement || this.computedDisabled
            ? null
            : this.focusableElement.nativeElement;
    }

    get focused(): boolean {
        return tuiIsNativeFocused(this.nativeFocusableElement);
    }

    override get computedFocusable(): boolean {
        return this.interactive && this.focusable;
    }

    onChecked(checked: boolean): void {
        this.updateValue(checked);
    }

    onFocused(focused: boolean): void {
        this.updateFocused(focused);
    }

    onFocusVisible(focusVisible: boolean): void {
        this.updateFocusVisible(focusVisible);
    }
}
