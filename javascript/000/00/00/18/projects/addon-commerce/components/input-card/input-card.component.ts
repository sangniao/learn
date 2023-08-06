import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    Optional,
    Output,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {TUI_CARD_MASK} from '@taiga-ui/addon-commerce/constants';
import {TuiPaymentSystem} from '@taiga-ui/addon-commerce/types';
import {tuiGetPaymentSystem} from '@taiga-ui/addon-commerce/utils';
import {
    AbstractTuiControl,
    tuiAsControl,
    tuiAsFocusableItemAccessor,
    TuiAutofillFieldName,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
} from '@taiga-ui/cdk';
import {TuiPrimitiveTextfieldComponent, TuiTextMaskOptions} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

const icons: Record<TuiPaymentSystem, string> = {
    mir: `tuiIconMir`,
    visa: `tuiIconVisa`,
    electron: `tuiIconElectron`,
    mastercard: `tuiIconMastercard`,
    maestro: `tuiIconMaestro`,
};

@Component({
    selector: `tui-input-card`,
    templateUrl: `./input-card.template.html`,
    styleUrls: [`./input-card.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAsFocusableItemAccessor(TuiInputCardComponent),
        tuiAsControl(TuiInputCardComponent),
    ],
})
export class TuiInputCardComponent
    extends AbstractTuiControl<string>
    implements TuiFocusableElementAccessor
{
    @ViewChild(TuiPrimitiveTextfieldComponent)
    private readonly input?: TuiPrimitiveTextfieldComponent;

    @Input()
    @tuiDefaultProp()
    cardSrc: PolymorpheusContent = ``;

    @Input()
    @tuiDefaultProp()
    autocompleteEnabled = false;

    @Output()
    readonly binChange = new EventEmitter<string | null>();

    readonly textMaskOptions: TuiTextMaskOptions = {
        mask: TUI_CARD_MASK,
        guide: false,
        pipe: conformedValue => conformedValue.trim(),
    };

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
    ) {
        super(control, changeDetectorRef);
    }

    private get defaultCardIcon(): string | null {
        const {paymentSystem} = this;

        return paymentSystem ? icons[paymentSystem] : null;
    }

    get nativeFocusableElement(): HTMLInputElement | null {
        return this.input ? this.input.nativeFocusableElement : null;
    }

    get focused(): boolean {
        return !!this.input && this.input.focused;
    }

    get icon(): PolymorpheusContent {
        return this.cardSrc || this.defaultCardIcon;
    }

    get autocomplete(): TuiAutofillFieldName {
        return this.autocompleteEnabled ? `cc-number` : `off`;
    }

    get paymentSystem(): TuiPaymentSystem | null {
        return tuiGetPaymentSystem(this.value);
    }

    get bin(): string | null {
        return this.value.length < 6 ? null : this.value.slice(0, 6);
    }

    get formattedCard(): string {
        return this.value
            .split(``)
            .map((char, index) => (index && index % 4 === 0 ? ` ${char}` : char))
            .join(``);
    }

    onValueChange(value: string): void {
        const parsed = value.split(` `).join(``);
        const currentBin = this.bin;

        this.updateValue(parsed);

        const newBin = this.bin;

        if (currentBin !== newBin) {
            this.binChange.emit(newBin);
        }
    }

    onFocused(focused: boolean): void {
        this.updateFocused(focused);
    }

    override writeValue(value: string | null): void {
        const currentBin = this.bin;

        super.writeValue(value);

        const newBin = this.bin;

        if (currentBin !== newBin) {
            this.binChange.emit(newBin);
        }
    }

    protected getFallbackValue(): string {
        return ``;
    }
}
