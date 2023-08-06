import {inject, InjectionToken} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';

interface WindowWithCypress extends Window {
    Cypress?: unknown;
}

/**
 * {@link https://docs.cypress.io/faq/questions/using-cypress-faq#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress Cypress docs}
 */
export const TUI_IS_CYPRESS = new InjectionToken<boolean>(
    `[TUI_IS_CYPRESS]: Detect if app is running under Cypress`,
    {
        factory: () => !!inject<WindowWithCypress>(WINDOW).Cypress,
    },
);
