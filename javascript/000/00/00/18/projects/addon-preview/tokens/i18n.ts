import {InjectionToken} from '@angular/core';
import {tuiExtractI18n} from '@taiga-ui/i18n';

export const TUI_PREVIEW_TEXTS = new InjectionToken(
    `[TUI_PREVIEW_TEXTS]: tui-preview i18n`,
    {
        factory: tuiExtractI18n(`previewTexts`),
    },
);

export const TUI_PREVIEW_ZOOM_TEXTS = new InjectionToken(
    `[TUI_PREVIEW_ZOOM_TEXTS]: tui-preview zoom i18n`,
    {
        factory: tuiExtractI18n(`zoomTexts`),
    },
);
