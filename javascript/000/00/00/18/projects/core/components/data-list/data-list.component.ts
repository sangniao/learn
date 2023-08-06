import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    Optional,
    QueryList,
    ViewEncapsulation,
} from '@angular/core';
import {
    EMPTY_QUERY,
    tuiDefaultProp,
    tuiIsElement,
    tuiIsNativeFocusedIn,
    tuiIsPresent,
    tuiItemsQueryListObservable,
    tuiMoveFocus,
    tuiPure,
    tuiSetNativeMouseFocused,
} from '@taiga-ui/cdk';
import {TuiTextfieldSizeDirective} from '@taiga-ui/core/directives';
import {TuiDataListAccessor} from '@taiga-ui/core/interfaces';
import {TUI_NOTHING_FOUND_MESSAGE, tuiAsDataListAccessor} from '@taiga-ui/core/tokens';
import {TuiDataListRole} from '@taiga-ui/core/types';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

// TODO: find the best way for prevent cycle
// eslint-disable-next-line import/no-cycle
import {TuiOptionComponent} from './option/option.component';

// TODO: Consider aria-activedescendant for proper accessibility implementation
@Component({
    selector: `tui-data-list`,
    templateUrl: `./data-list.template.html`,
    styleUrls: [`./data-list.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [tuiAsDataListAccessor(TuiDataListComponent)],
})
export class TuiDataListComponent<T> implements TuiDataListAccessor<T> {
    @ContentChildren(forwardRef(() => TuiOptionComponent), {descendants: true})
    private readonly options: QueryList<TuiOptionComponent<T>> = EMPTY_QUERY;

    private origin?: HTMLElement;

    @Input()
    @HostBinding(`attr.role`)
    @tuiDefaultProp()
    role: TuiDataListRole = `listbox`;

    @Input()
    @tuiDefaultProp()
    emptyContent: PolymorpheusContent = ``;

    @Input()
    @HostBinding(`attr.data-list-size`)
    @tuiDefaultProp()
    size = this.controller?.size || `m`;

    constructor(
        @Optional()
        @Inject(TuiTextfieldSizeDirective)
        private readonly controller: TuiTextfieldSizeDirective | null,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(TUI_NOTHING_FOUND_MESSAGE)
        readonly defaultEmptyContent$: Observable<string>,
    ) {}

    @tuiPure
    get empty$(): Observable<boolean> {
        return tuiItemsQueryListObservable(this.options).pipe(map(({length}) => !length));
    }

    @HostListener(`focusin`, [`$event.relatedTarget`, `$event.currentTarget`])
    onFocusIn(relatedTarget: HTMLElement, currentTarget: HTMLElement): void {
        if (!currentTarget.contains(relatedTarget) && !this.origin) {
            this.origin = relatedTarget;
        }
    }

    @HostListener(`mousedown.prevent`)
    noop(): void {}

    @HostListener(`keydown.arrowDown.prevent`, [`$event.target`, `1`])
    @HostListener(`keydown.arrowUp.prevent`, [`$event.target`, `-1`])
    onKeyDownArrow(current: HTMLElement, step: number): void {
        const {elements} = this;

        tuiMoveFocus(elements.indexOf(current), elements, step);
    }

    // TODO: Consider aria-activedescendant for proper accessibility implementation
    @HostListener(`wheel.silent.passive`)
    @HostListener(`mouseleave`, [`$event.target`])
    handleFocusLossIfNecessary(element: Element = this.elementRef.nativeElement): void {
        if (this.origin && tuiIsNativeFocusedIn(element)) {
            tuiSetNativeMouseFocused(this.origin, true, true);
        }
    }

    getOptions(includeDisabled: boolean = false): readonly T[] {
        return this.options
            .filter(({disabled}) => includeDisabled || !disabled)
            .map(({value}) => value)
            .filter(tuiIsPresent);
    }

    onFocus({target}: Event, top: boolean): void {
        if (!tuiIsElement(target)) {
            return;
        }

        const {elements} = this;

        tuiMoveFocus(top ? -1 : elements.length, elements, top ? 1 : -1);
        this.handleFocusLossIfNecessary(target);
    }

    private get elements(): readonly HTMLElement[] {
        return Array.from(this.elementRef.nativeElement.querySelectorAll(`[tuiOption]`));
    }
}
