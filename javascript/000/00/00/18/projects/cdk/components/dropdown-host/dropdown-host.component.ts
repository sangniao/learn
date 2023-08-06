import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {
    AbstractTuiPortalHostComponent,
    AbstractTuiPortalService,
} from '@taiga-ui/cdk/abstract';
import {EMPTY_CLIENT_RECT} from '@taiga-ui/cdk/constants';

import {TuiDropdownPortalService} from './dropdown-portal.service';

/**
 * Host element for dynamically created portals, for example using {@link TuiDropdownDirective}.
 */
@Component({
    selector: `tui-dropdown-host`,
    templateUrl: `./dropdown-host.template.html`,
    styleUrls: [`./dropdown-host.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {provide: AbstractTuiPortalService, useExisting: TuiDropdownPortalService},
        {provide: AbstractTuiPortalHostComponent, useExisting: TuiDropdownHostComponent},
    ],
})
export class TuiDropdownHostComponent extends AbstractTuiPortalHostComponent {
    @ViewChild(`positionFixedOffset`)
    private readonly positionFixedOffsetRef?: ElementRef<HTMLDivElement>;

    fixedPositionOffset(): ClientRect {
        return (
            this.positionFixedOffsetRef?.nativeElement.getBoundingClientRect() ||
            EMPTY_CLIENT_RECT
        );
    }
}
