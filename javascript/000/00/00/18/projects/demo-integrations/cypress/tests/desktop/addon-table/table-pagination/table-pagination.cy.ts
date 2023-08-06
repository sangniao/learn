import {WAIT_BEFORE_SCREENSHOT} from '@demo-integrations/support/properties/shared.entities';

describe(`TablePagination`, () => {
    beforeEach(() => {
        cy.viewport(`macbook-13`);
    });

    describe(`Dropdown with \`[size]\`-options (amount items per page)`, () => {
        it(`Basic case`, () => {
            cy.tuiVisit(`/components/table-pagination/API`);
            initializeAliases(`#demoContent`);

            cy.get(`@linesPerPageSelect`).click();
            waitForCheckmarkIcon();
            cy.get(`@tablePagination`).matchImageSnapshot(`0-[size]-dropdown-base`, {
                padding: [0, 0, 150, 0],
            });
        });

        it(`With very long option name`, () => {
            const longNumber = 10000000000000000000;

            cy.tuiVisit(
                `/components/table-pagination/API?items=[0, ${longNumber}]&size=${longNumber}&total=${longNumber}&page=0`,
            );
            initializeAliases(`#demoContent`);

            cy.get(`@linesPerPageSelect`).click();
            waitForCheckmarkIcon();
            cy.get(`@tablePagination`).matchImageSnapshot(
                `1-[size]-dropdown-long-option-name`,
                {
                    padding: [0, 0, 100, 0],
                },
            );
        });
    });

    it(`Custom size-option content`, () => {
        cy.tuiVisit(`/components/table-pagination`);

        initializeAliases(`#custom-size-option-content`);

        cy.get(`@linesPerPageSelect`).click();

        waitForCheckmarkIcon();

        cy.get(`tui-dropdown`)
            .wait(WAIT_BEFORE_SCREENSHOT)
            .matchImageSnapshot(`2-[sizeOptionContent]-dropdown`);
    });
});

function initializeAliases(selectorToTablePagination: string): void {
    cy.get(`${selectorToTablePagination} tui-table-pagination`)
        .should(`be.visible`)
        .as(`tablePagination`);

    cy.get(`@tablePagination`)
        .find(
            `[automation-id=tui-table-pagination__lines-per-page-wrapper] tui-hosted-dropdown`,
        )
        .should(`be.visible`)
        .as(`linesPerPageSelect`);
}

function waitForCheckmarkIcon(): void {
    cy.get(`tui-dropdown`)
        .find(`tui-svg[src=tuiIconCheckLarge] use`)
        .should(`be.visible`)
        .invoke(`height`)
        .should(`be.greaterThan`, 0);
}
