import {DOCUMENT} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    ViewEncapsulation,
} from '@angular/core';
import {TUI_DIALOGS, TUI_IS_MOBILE, TUI_VERSION, tuiAssert} from '@taiga-ui/cdk';
import {TUI_IS_MOBILE_RES_PROVIDER} from '@taiga-ui/core/providers';
import {
    TUI_ANIMATIONS_DURATION,
    TUI_ASSERT_ENABLED,
    TUI_IS_MOBILE_RES,
    TUI_THEME,
} from '@taiga-ui/core/tokens';
import {merge, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: `tui-root`,
    templateUrl: `root.template.html`,
    styleUrls: [`./root.style.less`],
    // So that we do not force OnPush on custom dialogs
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [TUI_IS_MOBILE_RES_PROVIDER],
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-tui-version': TUI_VERSION,
        '[style.--tui-duration.ms]': `duration`,
        '($.class._mobile)': `isMobileRes$`,
    },
})
export class TuiRootComponent {
    readonly scrollbars$: Observable<boolean> =
        this.dialogs.length && !this.isMobile
            ? merge(...this.dialogs).pipe(map(({length}) => !length))
            : of(!this.isMobile);

    constructor(
        @Inject(TUI_ANIMATIONS_DURATION) readonly duration: number,
        @Inject(ElementRef) readonly elementRef: ElementRef<HTMLElement>,
        @Inject(TUI_DIALOGS)
        readonly dialogs: ReadonlyArray<Observable<readonly unknown[]>>,
        @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean,
        @Inject(TUI_ASSERT_ENABLED) enabled: boolean,
        @Inject(TUI_IS_MOBILE_RES) readonly isMobileRes$: Observable<boolean>,
        @Inject(DOCUMENT) {body}: Document,
        @Inject(TUI_THEME) theme: string,
    ) {
        tuiAssert.enabled = enabled;
        body.setAttribute(`data-tui-theme`, theme.toLowerCase());
    }
}
