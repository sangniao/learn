import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    forwardRef,
    Inject,
    QueryList,
} from '@angular/core';
import {EMPTY_QUERY, tuiItemsQueryListObservable} from '@taiga-ui/cdk';
import {ReplaySubject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {TuiCellDirective} from '../directives/cell.directive';
import {TuiTableDirective} from '../directives/table.directive';
import {TUI_TABLE_PROVIDER} from '../providers/table.provider';
// TODO: find the best way for prevent cycle
// eslint-disable-next-line import/no-cycle
import {TuiTbodyComponent} from '../tbody/tbody.component';

@Component({
    selector: `tr[tuiTr]`,
    templateUrl: `./tr.template.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TUI_TABLE_PROVIDER],
})
export class TuiTrComponent<T extends Partial<Record<keyof T, any>>>
    implements AfterContentInit
{
    @ContentChildren(forwardRef(() => TuiCellDirective))
    private readonly cells: QueryList<TuiCellDirective> = EMPTY_QUERY;

    private readonly contentReady$ = new ReplaySubject<boolean>(1);

    readonly cells$ = this.contentReady$.pipe(
        switchMap(() => tuiItemsQueryListObservable(this.cells)),
        map(cells =>
            cells.reduce(
                (record, item) => ({...record, [item.tuiCell]: item}),
                {} as Record<keyof T | string, TuiCellDirective>,
            ),
        ),
    );

    readonly item$ = this.contentReady$.pipe(
        switchMap(() => tuiItemsQueryListObservable(this.body.rows)),
        map(
            rows =>
                /**
                 * TODO v4.0 replace `this.body.sorted` with `this.body.data` (dont forget to drop `sorted`-getter).
                 */
                this.body.sorted[rows.findIndex(row => row === this)] as Record<
                    keyof T | string,
                    any
                >,
        ),
    );

    constructor(
        @Inject(forwardRef(() => TuiTableDirective))
        readonly table: TuiTableDirective<T>,
        @Inject(forwardRef(() => TuiTbodyComponent))
        private readonly body: TuiTbodyComponent<T>,
    ) {}

    async ngAfterContentInit(): Promise<void> {
        await Promise.resolve();
        this.contentReady$.next(true);
    }
}
