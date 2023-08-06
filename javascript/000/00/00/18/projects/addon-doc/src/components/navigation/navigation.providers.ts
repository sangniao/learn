import {InjectionToken, Provider} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TuiDestroyService, tuiIsPresent} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {filter, map, mergeMap, takeUntil} from 'rxjs/operators';

import {TUI_DOC_PAGES} from '../../tokens/pages';
import {TUI_DOC_TITLE} from '../../tokens/title';
import {TuiDocPages} from '../../types/pages';

export const NAVIGATION_TITLE = new InjectionToken<Observable<string>>(
    `[NAVIGATION_TITLE]: Page title`,
);
export const NAVIGATION_LABELS = new InjectionToken<readonly string[]>(
    `[NAVIGATION_LABELS]: Navigation sections labels for search`,
);
export const NAVIGATION_ITEMS: InjectionToken<readonly TuiDocPages[]> =
    new InjectionToken<readonly TuiDocPages[]>(`[NAVIGATION_ITEMS]: Navigation pages`);

export const NAVIGATION_PROVIDERS: Provider[] = [
    TuiDestroyService,
    {
        provide: NAVIGATION_TITLE,
        deps: [Router, ActivatedRoute, TUI_DOC_TITLE, TuiDestroyService],
        useFactory: (
            router: Router,
            activatedRoute: ActivatedRoute,
            titlePrefix: string,
            destroy$: Observable<void>,
        ): Observable<string> => {
            return router.events.pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => activatedRoute.firstChild),
                filter(tuiIsPresent),
                mergeMap(({data}) => data),
                map(({title}) => titlePrefix + title),
                takeUntil(destroy$),
            );
        },
    },
    {
        provide: NAVIGATION_LABELS,
        deps: [TUI_DOC_PAGES],
        useFactory: labelsProviderFactory,
    },
    {
        provide: NAVIGATION_ITEMS,
        deps: [TUI_DOC_PAGES],
        useFactory: (pages: TuiDocPages): readonly TuiDocPages[] => {
            const labels = labelsProviderFactory(pages);

            return [
                ...labels.map(label => pages.filter(({section}) => section === label)),
                pages.filter(page => !page.section),
            ];
        },
    },
];

function labelsProviderFactory(pages: TuiDocPages): readonly string[] {
    return pages
        .map(({section}) => section)
        .filter(tuiIsPresent)
        .filter((item, index, array) => array.indexOf(item) === index);
}
