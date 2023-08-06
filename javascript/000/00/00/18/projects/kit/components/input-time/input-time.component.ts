import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    Input,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
    AbstractTuiNullableControl,
    ALWAYS_FALSE_HANDLER,
    TUI_STRICT_MATCHER,
    tuiAsControl,
    tuiAsFocusableItemAccessor,
    TuiBooleanHandler,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
    tuiIsElement,
    tuiIsInput,
    tuiIsNativeFocused,
    tuiPure,
    TuiTime,
    TuiTimeLike,
    TuiTimeMode,
} from '@taiga-ui/cdk';
import {
    tuiAsDataListHost,
    tuiAsOptionContent,
    TuiDataListHost,
    TuiPrimitiveTextfieldComponent,
    TuiTextMaskOptions,
} from '@taiga-ui/core';
import {TUI_SELECT_OPTION} from '@taiga-ui/kit/components/select-option';
import {FIXED_DROPDOWN_CONTROLLER_PROVIDER} from '@taiga-ui/kit/providers';
import {TUI_TIME_TEXTS} from '@taiga-ui/kit/tokens';
import {
    tuiCreateAutoCorrectedTimePipe,
    tuiCreateTimeMask,
} from '@taiga-ui/kit/utils/mask';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {TUI_INPUT_TIME_OPTIONS, TuiInputTimeOptions} from './input-time-options';

@Component({
    selector: `tui-input-time`,
    templateUrl: `./input-time.template.html`,
    styleUrls: [`./input-time.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAsFocusableItemAccessor(TuiInputTimeComponent),
        tuiAsControl(TuiInputTimeComponent),
        tuiAsDataListHost(TuiInputTimeComponent),
        tuiAsOptionContent(TUI_SELECT_OPTION),
    ],
    viewProviders: [FIXED_DROPDOWN_CONTROLLER_PROVIDER],
})
export class TuiInputTimeComponent
    extends AbstractTuiNullableControl<TuiTime>
    implements TuiFocusableElementAccessor, TuiDataListHost<TuiTime>
{
    @ViewChild(TuiPrimitiveTextfieldComponent)
    private readonly textfield?: TuiPrimitiveTextfieldComponent;

    @Input()
    @tuiDefaultProp()
    disabledItemHandler: TuiBooleanHandler<TuiTime> = ALWAYS_FALSE_HANDLER;

    @Input()
    @tuiDefaultProp()
    items: readonly TuiTime[] = [];

    @Input()
    @tuiDefaultProp()
    itemSize: TuiInputTimeOptions['itemSize'] = this.options.itemSize;

    @Input()
    @tuiDefaultProp()
    strict = false;

    @Input()
    @tuiDefaultProp()
    mode: TuiInputTimeOptions['mode'] = this.options.mode;

    @Input()
    @tuiDefaultProp()
    postfix: TuiInputTimeOptions['postfix'] = this.options.postfix;

    open = false;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
        @Inject(TUI_TIME_TEXTS)
        private readonly timeTexts$: Observable<Record<TuiTimeMode, string>>,
        @Inject(TUI_INPUT_TIME_OPTIONS)
        private readonly options: TuiInputTimeOptions,
    ) {
        super(control, changeDetectorRef);
    }

    get nativeFocusableElement(): HTMLInputElement | null {
        return this.textfield ? this.textfield.nativeFocusableElement : null;
    }

    get focused(): boolean {
        return tuiIsNativeFocused(this.nativeFocusableElement);
    }

    get filtered(): readonly TuiTime[] {
        return this.filter(this.items, this.mode, this.computedSearch);
    }

    get textMaskOptions(): TuiTextMaskOptions {
        return this.calculateMask(this.mode);
    }

    get computedValue(): string {
        return this.value ? this.value.toString(this.mode) : this.nativeValue;
    }

    get computedSearch(): string {
        return this.computedValue.length !== this.mode.length ? this.computedValue : ``;
    }

    get innerPseudoFocused(): boolean | null {
        if (this.pseudoFocus === false) {
            return false;
        }

        if (this.open || this.computedFocused) {
            return true;
        }

        return null;
    }

    get icon(): TuiInputTimeOptions['icon'] {
        return this.options.icon;
    }

    get nativeValue(): string {
        return this.nativeFocusableElement ? this.nativeFocusableElement.value : ``;
    }

    set nativeValue(value: string) {
        if (!this.nativeFocusableElement) {
            return;
        }

        this.nativeFocusableElement.value = value;
    }

    @tuiPure
    getFiller$(mode: TuiTimeMode): Observable<string> {
        return this.timeTexts$.pipe(map(texts => texts[mode]));
    }

    @HostListener(`click`)
    onClick(): void {
        this.open = !this.open;
    }

    onValueChange(value: string): void {
        this.open = !!this.items.length;

        if (this.control) {
            this.control.updateValueAndValidity({emitEvent: false});
        }

        const match = this.getMatch(value);

        if (match !== undefined) {
            this.updateValue(match);

            return;
        }

        if (value.length !== this.mode.length) {
            this.updateValue(null);

            return;
        }

        const time = TuiTime.fromString(value);

        this.updateValue(this.strict ? this.findNearestTimeFromItems(time) : time);
    }

    onFocused(focused: boolean): void {
        this.updateFocused(focused);

        if (
            focused ||
            this.value !== null ||
            this.nativeValue === `` ||
            this.mode === `HH:MM`
        ) {
            return;
        }

        const parsedTime = TuiTime.fromString(this.nativeValue);

        this.updateValue(parsedTime);

        setTimeout(() => {
            if (this.nativeValue.endsWith(`.`) || this.nativeValue.endsWith(`:`)) {
                this.nativeValue = this.nativeValue.slice(0, -1);
            }
        });
    }

    onArrowUp(event: Event): void {
        if (this.items.length) {
            return;
        }

        this.processArrow(event, 1);
    }

    onArrowDown(event: Event): void {
        if (this.items.length) {
            return;
        }

        this.processArrow(event, -1);
    }

    handleOption(item: TuiTime): void {
        this.focusInput();
        this.updateValue(item);
    }

    onOpen(open: boolean): void {
        this.open = open;
    }

    override writeValue(value: TuiTime | null): void {
        super.writeValue(value);
        this.nativeValue = value ? this.computedValue : ``;
    }

    @tuiPure
    private calculateMask(mode: TuiTimeMode): TuiTextMaskOptions {
        return {
            mask: tuiCreateTimeMask(mode, this.options.maxValues),
            pipe: tuiCreateAutoCorrectedTimePipe(mode, this.options.maxValues),
            guide: false,
        };
    }

    @tuiPure
    private filter(
        items: readonly TuiTime[],
        mode: TuiTimeMode,
        search: string,
    ): readonly TuiTime[] {
        return items.filter(item => item.toString(mode).includes(search));
    }

    private findNearestTimeFromItems(value: TuiTime): TuiTime | null {
        return this.items.reduce((previous, current) =>
            Math.abs(current.toAbsoluteMilliseconds() - value.toAbsoluteMilliseconds()) <
            Math.abs(previous.toAbsoluteMilliseconds() - value.toAbsoluteMilliseconds())
                ? current
                : previous,
        );
    }

    private getMatch(value: string): TuiTime | undefined {
        return this.items.find(item => TUI_STRICT_MATCHER(item, value));
    }

    private close(): void {
        this.open = false;
    }

    private processArrow(event: Event, shift: -1 | 1): void {
        const {target} = event;

        if (this.readOnly || !tuiIsElement(target) || !tuiIsInput(target)) {
            return;
        }

        const selectionStart = target.selectionStart || 0;

        this.shiftTime(this.calculateShift(selectionStart, shift));

        target.setSelectionRange(selectionStart, selectionStart);
        event.preventDefault();
    }

    private calculateShift(selectionStart: number, shift: number): TuiTimeLike {
        if (selectionStart <= 2) {
            return {hours: shift};
        }

        if (selectionStart <= 5) {
            return {minutes: shift};
        }

        if (selectionStart <= 8) {
            return {seconds: shift};
        }

        return {ms: shift};
    }

    private shiftTime(shift: TuiTimeLike): void {
        if (this.value === null) {
            return;
        }

        const increasedTime: TuiTime = this.value.shift(shift);

        // Manual update so we can set caret position properly
        this.nativeValue = increasedTime.toString(this.mode);
        this.updateValue(increasedTime);
    }

    private focusInput(preventScroll: boolean = false): void {
        if (this.nativeFocusableElement) {
            this.nativeFocusableElement.focus({preventScroll});
            this.close();
        }
    }
}
