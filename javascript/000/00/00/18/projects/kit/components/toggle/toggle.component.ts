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
    AbstractTuiControl,
    tuiAsControl,
    tuiAsFocusableItemAccessor,
    TuiContextWithImplicit,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
    tuiIsNativeFocused,
    TuiNativeFocusableElement,
} from '@taiga-ui/cdk';
import {
    TuiAppearance,
    TuiBrightness,
    TuiModeDirective,
    TuiSizeL,
    TuiSizeXS,
} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

import {TUI_TOGGLE_OPTIONS, TuiToggleOptions} from './toggle-options';

@Component({
    selector: `tui-toggle`,
    templateUrl: `./toggle.template.html`,
    styleUrls: [`./toggle.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAsFocusableItemAccessor(TuiToggleComponent),
        tuiAsControl(TuiToggleComponent),
    ],
})
export class TuiToggleComponent
    extends AbstractTuiControl<boolean>
    implements TuiFocusableElementAccessor
{
    @ViewChild(`focusableElement`)
    private readonly focusableElement?: ElementRef<TuiNativeFocusableElement>;

    @Input()
    @tuiDefaultProp()
    singleColor = this.options.singleColor;

    @Input()
    @tuiDefaultProp()
    showIcons = this.options.showIcons;

    @Input()
    @tuiDefaultProp()
    showLoader = false;

    @Input()
    @HostBinding(`attr.data-size`)
    @tuiDefaultProp()
    size: TuiSizeL = this.options.size;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
        @Optional()
        @Inject(TuiModeDirective)
        private readonly modeDirective: TuiModeDirective | null,
        @Inject(TUI_TOGGLE_OPTIONS)
        readonly options: TuiToggleOptions,
    ) {
        super(control, changeDetectorRef);
    }

    get iconOn(): PolymorpheusContent<TuiContextWithImplicit<TuiSizeL>> {
        return this.options.icons.toggleOn;
    }

    get iconOff(): PolymorpheusContent<TuiContextWithImplicit<TuiSizeL>> {
        return this.options.icons.toggleOff;
    }

    get nativeFocusableElement(): TuiNativeFocusableElement | null {
        return this.focusableElement ? this.focusableElement.nativeElement : null;
    }

    get focused(): boolean {
        return tuiIsNativeFocused(this.nativeFocusableElement);
    }

    get appearance(): TuiAppearance {
        return this.singleColor || this.checked
            ? TuiAppearance.Primary
            : TuiAppearance.Secondary;
    }

    get sizeM(): boolean {
        return this.size === `m`;
    }

    @HostBinding(`class._checked`)
    get checked(): boolean {
        return this.value;
    }

    get loaderSize(): TuiSizeXS {
        return this.sizeM ? `xs` : `s`;
    }

    @HostBinding(`attr.data-mode`)
    get hostMode(): TuiBrightness | null {
        return this.modeDirective ? this.modeDirective.mode : null;
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

    protected getFallbackValue(): boolean {
        return false;
    }
}
