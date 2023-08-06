import {DOCUMENT} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    Input,
    Optional,
    Sanitizer,
    SecurityContext,
} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {WINDOW} from '@ng-web-apis/common';
import {
    tuiAssert,
    tuiGetDocumentOrShadowRoot,
    tuiPure,
    tuiRequiredSetter,
    TuiStaticRequestService,
    TuiStringHandler,
} from '@taiga-ui/cdk';
import {TUI_ICON_ERROR} from '@taiga-ui/core/constants';
import {TuiIconError} from '@taiga-ui/core/interfaces';
import {TuiSvgService} from '@taiga-ui/core/services';
import {
    TUI_ICONS_PATH,
    TUI_SANITIZER,
    TUI_SVG_CONTENT_PROCESSOR,
    TUI_SVG_SRC_PROCESSOR,
} from '@taiga-ui/core/tokens';
import {tuiIsPresumedHTMLString} from '@taiga-ui/core/utils/miscellaneous';
import {Observable, of, ReplaySubject} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

const UNDEFINED_NAMED_ICON = `Attempted to use undefined named icon`;
const MISSING_EXTERNAL_ICON = `External icon is missing on the given URL`;
const FAILED_EXTERNAL_ICON = `Failed to load external SVG`;

// TODO: Consider moving to CDK along with SvgService and SvgDefsHostComponent
@Component({
    selector: `tui-svg`,
    templateUrl: `./svg.template.html`,
    styleUrls: [`./svg.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiSvgComponent {
    private readonly src$ = new ReplaySubject<void>(1);
    private icon = ``;

    readonly innerHTML$: Observable<SafeHtml>;

    constructor(
        @Inject(DOCUMENT) private readonly documentRef: Document,
        @Inject(WINDOW) private readonly windowRef: Window,
        @Inject(TUI_ICONS_PATH) private readonly iconsPath: TuiStringHandler<string>,
        @Optional()
        @Inject(TUI_SANITIZER)
        private readonly tuiSanitizer: Sanitizer | null,
        @Inject(TuiSvgService) private readonly svgService: TuiSvgService,
        @Inject(TuiStaticRequestService)
        private readonly staticRequestService: TuiStaticRequestService,
        @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
        @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
        @Inject(TUI_SVG_SRC_PROCESSOR)
        private readonly srcProcessor: TuiStringHandler<string>,
        @Inject(TUI_SVG_CONTENT_PROCESSOR)
        private readonly contentProcessor: TuiStringHandler<string>,
    ) {
        this.innerHTML$ = this.src$.pipe(
            switchMap(() =>
                this.isExternal
                    ? this.getExternalIcon(this.icon)
                    : of(this.getSafeHtml(this.icon)),
            ),
            startWith(``),
        );
    }

    @Input()
    @tuiRequiredSetter()
    set src(src: string) {
        this.icon = this.srcProcessor(src);
        this.src$.next();
    }

    get src(): string {
        return this.icon;
    }

    get use(): string {
        return this.icon.includes(`.svg#`)
            ? this.icon
            : this.resolveName(this.icon, this.iconsPath);
    }

    get isInnerHTML(): boolean {
        return this.isSrc || this.isExternal || (this.isName && this.isShadowDOM);
    }

    private get isShadowDOM(): boolean {
        return (
            tuiGetDocumentOrShadowRoot(this.elementRef.nativeElement) !== this.documentRef
        );
    }

    private get isUse(): boolean {
        return this.use.includes(`.svg#`);
    }

    private get isExternal(): boolean {
        return this.isUrl || this.isCrossDomain;
    }

    private get isUrl(): boolean {
        return this.icon.endsWith(`.svg`);
    }

    private get isSrc(): boolean {
        return tuiIsPresumedHTMLString(this.icon);
    }

    private get isName(): boolean {
        return !this.isUrl && !this.isUse && !this.isSrc;
    }

    private get isCrossDomain(): boolean {
        const {use, isUse, windowRef} = this;

        return (
            isUse &&
            use.startsWith(`http`) &&
            !!windowRef.origin &&
            !use.startsWith(windowRef.origin)
        );
    }

    onError(message: string = MISSING_EXTERNAL_ICON): void {
        const {icon} = this;
        const event = new CustomEvent<TuiIconError>(TUI_ICON_ERROR, {
            bubbles: true,
            detail: {
                message,
                icon,
            },
        });

        tuiAssert.assert(false, message, icon);
        this.elementRef.nativeElement.dispatchEvent(event);
    }

    @tuiPure
    private resolveName(name: string, iconsPath: TuiStringHandler<string>): string {
        return iconsPath(name);
    }

    private getSafeHtml(src: string): SafeHtml {
        return this.isSrc ? this.sanitize(src) : this.process(src);
    }

    private process(src: string): SafeHtml {
        const icon = this.svgService.getOriginal(src);

        if (this.isName && !icon && !!src) {
            this.onError(UNDEFINED_NAMED_ICON);
        }

        // Empty line for innerHTML when icon is shown through USE tag
        return !this.isShadowDOM || !this.isName ? `` : this.sanitize(icon || ``);
    }

    private sanitize(src: string): SafeHtml | string {
        src = this.contentProcessor(src);

        return this.tuiSanitizer
            ? this.sanitizer.bypassSecurityTrustHtml(
                  this.tuiSanitizer.sanitize(SecurityContext.HTML, src) || ``,
              )
            : src;
    }

    private getExternalIcon(src: string): Observable<SafeHtml> {
        const url = src.includes(`.svg`) ? src : this.use;

        return this.staticRequestService.request(url).pipe(
            catchError(() => {
                this.onError(FAILED_EXTERNAL_ICON);

                return of(``);
            }),
            map(response =>
                this.sanitize(response.replace(`<svg`, `<svg focusable="false"`)),
            ),
        );
    }
}
