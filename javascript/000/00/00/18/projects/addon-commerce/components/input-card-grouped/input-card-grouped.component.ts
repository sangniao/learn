import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    Optional,
    Output,
    Self,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {TUI_CARD_MASK, tuiDefaultCardValidator} from '@taiga-ui/addon-commerce/constants';
import {TuiCard} from '@taiga-ui/addon-commerce/interfaces';
import {TuiCodeCVCLength, TuiPaymentSystem} from '@taiga-ui/addon-commerce/types';
import {
    tuiCreateAutoCorrectedExpirePipe,
    tuiGetPaymentSystem,
} from '@taiga-ui/addon-commerce/utils';
import {
    AbstractTuiNullableControl,
    tuiAsControl,
    tuiAsFocusableItemAccessor,
    TuiAutofillFieldName,
    TuiBooleanHandler,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
    tuiIsElement,
    tuiIsInput,
    tuiIsNativeFocused,
    tuiIsNativeFocusedIn,
    tuiPure,
    tuiRequiredSetter,
} from '@taiga-ui/cdk';
import {
    MODE_PROVIDER,
    TUI_DIGIT_REGEXP,
    TUI_MODE,
    TUI_NON_DIGIT_REGEXP,
    TUI_TEXTFIELD_APPEARANCE,
    tuiAsDataListHost,
    TuiBrightness,
    TuiDataListComponent,
    TuiDataListDirective,
    TuiDataListHost,
    TuiTextMaskOptions,
} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {Observable} from 'rxjs';

import {
    TUI_INPUT_CARD_GROUPED_TEXTS,
    TuiCardGroupedTexts,
} from './input-card-grouped.providers';

const STUB: TuiCard = {
    card: ``,
    expire: ``,
    cvc: ``,
};
const ICONS: Record<TuiPaymentSystem, string> = {
    mir: `tuiIconMir`,
    visa: `tuiIconVisa`,
    electron: `tuiIconElectron`,
    mastercard: `tuiIconMastercard`,
    maestro: `tuiIconMaestro`,
};

@Component({
    selector: `tui-input-card-grouped`,
    templateUrl: `./input-card-grouped.template.html`,
    styleUrls: [`./input-card-grouped.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAsFocusableItemAccessor(TuiInputCardGroupedComponent),
        tuiAsControl(TuiInputCardGroupedComponent),
        tuiAsDataListHost(TuiInputCardGroupedComponent),
        MODE_PROVIDER,
    ],
    host: {
        '($.data-mode.attr)': `mode$`,
        'data-size': `l`,
    },
})
export class TuiInputCardGroupedComponent
    extends AbstractTuiNullableControl<TuiCard>
    implements TuiFocusableElementAccessor, TuiDataListHost<Partial<TuiCard>>
{
    @ViewChild(`inputCard`)
    private readonly inputCard?: ElementRef<HTMLInputElement>;

    @ViewChild(`inputExpire`)
    private readonly inputExpire?: ElementRef<HTMLInputElement>;

    @ViewChild(`inputCVC`)
    private readonly inputCVC?: ElementRef<HTMLInputElement>;

    private expireInert = false;

    @Input()
    @tuiDefaultProp()
    autocompleteEnabled = false;

    @Input()
    @tuiDefaultProp()
    cardSrc: PolymorpheusContent = ``;

    @Input()
    @tuiDefaultProp()
    exampleText = `0000 0000 0000 0000`;

    @Input()
    @tuiDefaultProp()
    cardValidator: TuiBooleanHandler<string> = tuiDefaultCardValidator;

    @Input()
    @tuiRequiredSetter()
    set codeLength(length: TuiCodeCVCLength) {
        this.exampleTextCVC = `0`.repeat(length);
        this.maskCVC = {
            mask: new Array(length).fill(TUI_DIGIT_REGEXP),
            guide: false,
        };
    }

    @Output()
    readonly autofilledChange = new EventEmitter<boolean>();

    @Output()
    readonly binChange = new EventEmitter<string | null>();

    @ContentChild(TuiDataListDirective, {read: TemplateRef})
    readonly dropdown: PolymorpheusContent = ``;

    @ContentChild(TuiDataListComponent)
    readonly datalist?: TuiDataListComponent<TuiCard>;

    exampleTextCVC = `000`;

    maskCVC: TuiTextMaskOptions = {
        mask: new Array(3).fill(TUI_DIGIT_REGEXP),
        guide: false,
    };

    readonly maskCard: TuiTextMaskOptions = {
        mask: TUI_CARD_MASK,
        guide: false,
        pipe: conformedValue => conformedValue.trim(),
    };

    readonly maskExpire: TuiTextMaskOptions = {
        mask: [
            TUI_DIGIT_REGEXP,
            TUI_DIGIT_REGEXP,
            `/`,
            TUI_DIGIT_REGEXP,
            TUI_DIGIT_REGEXP,
        ],
        pipe: tuiCreateAutoCorrectedExpirePipe(),
        guide: false,
    };

    open = false;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(TUI_MODE) readonly mode$: Observable<TuiBrightness | null>,
        @Inject(TUI_INPUT_CARD_GROUPED_TEXTS)
        readonly cardGroupedTexts$: Observable<TuiCardGroupedTexts>,
        @Inject(TUI_TEXTFIELD_APPEARANCE)
        readonly appearance: string,
    ) {
        super(control, changeDetectorRef);
    }

    get nativeFocusableElement(): HTMLInputElement | null {
        return this.inputCard ? this.inputCard.nativeElement : null;
    }

    get focused(): boolean {
        return this.open || tuiIsNativeFocusedIn(this.elementRef.nativeElement);
    }

    get card(): string {
        return this.value?.card || ``;
    }

    get expire(): string {
        return this.value?.expire || ``;
    }

    get cvc(): string {
        return this.value?.cvc || ``;
    }

    get hasCleaner(): boolean {
        return !!this.value?.card?.trim() && !this.readOnly && !this.computedDisabled;
    }

    get hasDropdown(): boolean {
        return !!this.dropdown;
    }

    get defaultIcon(): string | null {
        const {paymentSystem} = this;

        return paymentSystem && ICONS[paymentSystem];
    }

    get icon(): PolymorpheusContent {
        return this.cardSrc || this.defaultIcon;
    }

    get bin(): string | null {
        return !this.value || this.value.card.length < 6
            ? null
            : this.value.card.slice(0, 6);
    }

    get placeholderRaised(): boolean {
        return (this.computedFocused && !this.readOnly) || this.hasCardNumber;
    }

    get hasCardNumber(): boolean {
        return !!this.value?.card?.trim();
    }

    get idCard(): string {
        return `${this.id}_card`;
    }

    get idExpire(): string {
        return `${this.id}_expire`;
    }

    get idCVC(): string {
        return `${this.id}_cvc`;
    }

    get isCardCollapsed(): boolean {
        return this.isFocusable(this.card) && !this.cardFocused;
    }

    get autocompleteCard(): TuiAutofillFieldName {
        return this.autocompleteEnabled ? `cc-number` : `off`;
    }

    get autocompleteExpire(): TuiAutofillFieldName {
        return this.autocompleteEnabled ? `cc-exp` : `off`;
    }

    get autocompleteCVC(): TuiAutofillFieldName {
        return this.autocompleteEnabled ? `cc-csc` : `off`;
    }

    get tailLength(): number {
        return this.hasExtraSpace ? 5 : 4;
    }

    // Safari expiration date autofill workaround
    get name(): 'ccexpiryyear' | null {
        return this.autocompleteEnabled ? `ccexpiryyear` : null;
    }

    get cardPrefilled(): boolean {
        return !!this.card.match(TUI_NON_DIGIT_REGEXP);
    }

    get cvcPrefilled(): boolean {
        return !!this.cvc.match(TUI_NON_DIGIT_REGEXP);
    }

    get cardFocusable(): boolean {
        return this.focusable && !this.cardPrefilled;
    }

    get expireFocusable(): boolean {
        return this.isFocusable(this.card) && !this.expireInert;
    }

    get cvcFocusable(): boolean {
        return this.isFocusable(this.card);
    }

    get masked(): string {
        return this.cardPrefilled ? `*${this.card.slice(-4)}` : `*`;
    }

    @HostListener(`keydown.esc`)
    onEsc(): void {
        this.open = false;
    }

    @HostListener(`keydown.arrowDown.prevent`, [`$event.target`, `1`])
    @HostListener(`keydown.arrowUp.prevent`, [`$event.target`, `-1`])
    onArrow(element: HTMLElement, step: number): void {
        this.open = this.hasDropdown;
        this.changeDetectorRef.detectChanges();
        this.datalist?.onKeyDownArrow(element, step);
    }

    handleOption(option: Partial<TuiCard>): void {
        const {card = ``, expire = ``, cvc = ``} = option;
        const {bin} = this;
        const element =
            (!expire && this.inputExpire?.nativeElement) || this.inputCVC?.nativeElement;

        this.updateValue({card, expire, cvc});
        this.updateBin(bin);
        this.open = false;
        this.expireInert = !!expire;

        element?.focus();
    }

    onCardChange(card: string): void {
        const {value, bin} = this;
        const parsed = card.split(` `).join(``);

        if (value && value.card === parsed) {
            return;
        }

        this.updateProperty(parsed, `card`);
        this.updateBin(bin);

        if (this.cardValidator(this.card) && !this.expire && this.inputExpire) {
            this.focusExpire();
        }
    }

    onExpireChange(expire: string): void {
        // @bad TODO: Workaround until mask pipe can replace chars and keep caret position
        // @bad TODO: Think about a solution without mask at all
        if (!this.inputExpire) {
            return;
        }

        if (parseInt(expire.slice(0, 2), 10) > 12) {
            expire = `12${expire.slice(2)}`;
        }

        if (expire.slice(0, 2) === `00`) {
            expire = `01${expire.slice(2)}`;
        }

        this.inputExpire.nativeElement.value = expire;
        this.updateProperty(expire, `expire`);

        if (expire.length === 5) {
            this.focusCVC();
        }
    }

    onCVCChange(cvc: string): void {
        this.updateProperty(cvc, `cvc`);
    }

    transform({offsetWidth}: HTMLSpanElement): string {
        return this.isCardCollapsed ? `translate3d(${offsetWidth}px, 0, 0)` : ``;
    }

    onActiveZoneChange(active: boolean): void {
        this.updateFocused(active);
        this.open = active && this.open;
    }

    onMouseDown(event: MouseEvent): void {
        if (tuiIsElement(event.target) && tuiIsInput(event.target)) {
            return;
        }

        event.preventDefault();
        this.focusInput();
    }

    onScroll({currentTarget}: Event): void {
        if (tuiIsElement(currentTarget)) {
            currentTarget.scrollLeft = 0;
        }
    }

    clear(): void {
        this.updateValue(null);
        this.focusCard();
    }

    toggle(): void {
        this.open = !this.open;
    }

    override writeValue(value: TuiCard | null): void {
        const {bin} = this;

        super.writeValue(value);
        this.updateBin(bin);
        this.expireInert = !!this.expire && this.cardPrefilled;
    }

    /** Public API for manual focus management */
    focusCard(): void {
        this.inputCard?.nativeElement.focus();
    }

    focusExpire(): void {
        this.inputExpire?.nativeElement.focus({preventScroll: true});
    }

    focusCVC(): void {
        this.inputCVC?.nativeElement.focus();
    }

    private get cardFocused(): boolean {
        return !!this.inputCard && tuiIsNativeFocused(this.inputCard.nativeElement);
    }

    private get paymentSystem(): TuiPaymentSystem | null {
        return this.value && tuiGetPaymentSystem(this.value.card);
    }

    private get hasExtraSpace(): boolean {
        return this.card.length % 4 > 0;
    }

    @tuiPure
    private isFocusable(card: string): boolean {
        return this.focusable && (this.cardValidator(card) || this.cardPrefilled);
    }

    private updateBin(oldBin: string | null): void {
        const {bin} = this;

        if (bin !== oldBin && !this.cardPrefilled) {
            this.binChange.emit(bin);
        }
    }

    private updateProperty(propValue: string, propName: 'card' | 'expire' | 'cvc'): void {
        const {card, expire, cvc} = this.value || STUB;
        const newValue: TuiCard = {
            card,
            expire,
            cvc,
        };

        newValue[propName] = propValue;

        if (!newValue.expire && !newValue.cvc && !newValue.card) {
            this.updateValue(null);
        } else {
            this.updateValue(newValue);
        }
    }

    private focusInput(): void {
        const element =
            (this.cardFocusable && this.inputCard?.nativeElement) ||
            (this.expireFocusable && this.inputExpire?.nativeElement) ||
            this.inputCVC?.nativeElement;

        element?.focus();
    }
}
