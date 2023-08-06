import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    forwardRef,
    HostBinding,
    Inject,
    QueryList,
} from '@angular/core';
import {EMPTY_QUERY} from '@taiga-ui/cdk';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {Subject} from 'rxjs';
import {distinctUntilChanged, map, startWith} from 'rxjs/operators';

import type {TuiTreeController, TuiTreeItemContext} from '../../misc/tree.interfaces';
// TODO: find the best way for prevent cycle
// eslint-disable-next-line import/no-cycle
import {
    TUI_TREE_CONTENT,
    TUI_TREE_CONTROLLER,
    TUI_TREE_LEVEL,
    TUI_TREE_NODE,
} from '../../misc/tree.tokens';
// eslint-disable-next-line import/no-cycle
import {TUI_TREE_ITEM_PROVIDERS} from './tree-item.providers';

@Component({
    selector: `tui-tree-item`,
    templateUrl: `./tree-item.template.html`,
    styleUrls: [`./tree-item.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: TUI_TREE_ITEM_PROVIDERS,
    host: {
        role: `treeitem`,
    },
})
export class TuiTreeItemComponent implements DoCheck {
    @ContentChildren(TUI_TREE_NODE as any)
    private readonly nested: QueryList<unknown> = EMPTY_QUERY;

    private readonly change$ = new Subject<void>();

    readonly expanded$ = this.change$.pipe(
        startWith(null),
        map(() => this.isExpanded),
        distinctUntilChanged(),
    );

    readonly attached$ = this.change$.pipe(
        map(() => this.elementRef.nativeElement.isConnected),
        distinctUntilChanged(),
    );

    constructor(
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(forwardRef(() => TUI_TREE_CONTROLLER))
        private readonly controller: TuiTreeController,
        @Inject(forwardRef(() => TUI_TREE_LEVEL))
        readonly level: number,
        @Inject(forwardRef(() => TUI_TREE_CONTENT))
        readonly content: PolymorpheusContent<TuiTreeItemContext>,
    ) {}

    @HostBinding(`class._expandable`)
    get isExpandable(): boolean {
        return !!this.nested.length;
    }

    get isExpanded(): boolean {
        return this.controller.isExpanded(this);
    }

    ngDoCheck(): void {
        this.change$.next();
    }
}
