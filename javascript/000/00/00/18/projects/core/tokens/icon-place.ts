import {InjectionToken} from '@angular/core';

export const TUI_ICONS_PLACE: InjectionToken<string> = new InjectionToken<string>(
    `[TUI_ICONS_PLACE]: Recommended paths to icons from documentation guide`,
    {
        factory: () => `assets/taiga-ui/icons`,
    },
);
