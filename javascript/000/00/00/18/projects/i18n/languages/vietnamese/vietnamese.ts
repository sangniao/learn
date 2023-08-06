import {TuiLanguage} from '@taiga-ui/i18n/interfaces';

import {TUI_VIETNAMESE_LANGUAGE_ADDON_COMMERCE} from './addon-commerce';
import {TUI_VIETNAMESE_LANGUAGE_ADDON_EDITOR} from './addon-editor';
import {TUI_VIETNAMESE_LANGUAGE_ADDON_PREVIEW} from './addon-preview';
import {TUI_VIETNAMESE_LANGUAGE_ADDON_TABLE} from './addon-table';
import {TUI_VIETNAMESE_LANGUAGE_CORE} from './core';
import {TUI_VIETNAMESE_LANGUAGE_KIT} from './kit';

export const TUI_VIETNAMESE_LANGUAGE: TuiLanguage = {
    name: `vietnamese`,
    ...TUI_VIETNAMESE_LANGUAGE_CORE,
    ...TUI_VIETNAMESE_LANGUAGE_KIT,
    ...TUI_VIETNAMESE_LANGUAGE_ADDON_TABLE,
    ...TUI_VIETNAMESE_LANGUAGE_ADDON_COMMERCE,
    ...TUI_VIETNAMESE_LANGUAGE_ADDON_EDITOR,
    ...TUI_VIETNAMESE_LANGUAGE_ADDON_PREVIEW,
};
