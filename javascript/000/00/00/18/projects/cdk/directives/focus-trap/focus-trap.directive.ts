import {DOCUMENT} from '@angular/common';
import {
    Directive,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
    Renderer2,
} from '@angular/core';
import {tuiContainsOrAfter, tuiIsHTMLElement} from '@taiga-ui/cdk/utils/dom';
import {
    tuiBlurNativeFocused,
    tuiGetClosestFocusable,
    tuiGetNativeFocused,
} from '@taiga-ui/cdk/utils/focus';

@Directive({
    selector: `[tuiFocusTrap]`,
    host: {
        tabIndex: `0`,
    },
})
export class TuiFocusTrapDirective implements OnDestroy {
    private readonly activeElement = tuiGetNativeFocused(this.documentRef);

    constructor(
        @Inject(DOCUMENT) private readonly documentRef: Document,
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(Renderer2) private readonly renderer: Renderer2,
    ) {
        /**
         * This would cause currently focused element to lose focus,
         * but it might cause ExpressionChanged error due to potential HostBinding.
         * Microtask keeps it in the same frame but allows change detection to run
         */
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Promise.resolve().then(() => {
            this.elementRef.nativeElement.focus();
        });
    }

    @HostListener(`blur`)
    onBlur(): void {
        this.renderer.removeAttribute(this.elementRef.nativeElement, `tabIndex`);
    }

    @HostListener(`window:focusin.silent`, [`$event.target`])
    onFocusIn(node: Node): void {
        const {nativeElement} = this.elementRef;

        if (tuiContainsOrAfter(nativeElement, node)) {
            return;
        }

        const focusable = tuiGetClosestFocusable({
            initial: nativeElement,
            root: nativeElement,
        });

        if (focusable) {
            focusable.focus();
        }
    }

    ngOnDestroy(): void {
        tuiBlurNativeFocused(this.documentRef);

        /**
         * HostListeners are triggered even after ngOnDestroy
         * {@link https://github.com/angular/angular/issues/38100}
         * so we need to delay it but stay in the same sync cycle,
         * therefore using Promise instead of setTimeout
         */
        // eslint-disable-next-line
        Promise.resolve().then(() => {
            if (tuiIsHTMLElement(this.activeElement)) {
                this.activeElement.focus();
            }
        });
    }
}
