import {InjectionToken, Provider, Type} from '@angular/core';
import {TuiDataListAccessor} from '@taiga-ui/core/interfaces';

export const TUI_DATA_LIST_ACCESSOR = new InjectionToken<TuiDataListAccessor>(
    `[TUI_DATA_LIST_ACCESSOR]: Accessor for options`,
);

export function tuiAsDataListAccessor(useExisting: Type<TuiDataListAccessor>): Provider {
    return {
        provide: TUI_DATA_LIST_ACCESSOR,
        useExisting,
    };
}
