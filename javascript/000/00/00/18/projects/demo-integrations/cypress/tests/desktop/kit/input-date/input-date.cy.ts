describe(`InputDate`, () => {
    describe(`Examples`, () => {
        for (const size of [`s`, `m`, `l`]) {
            it(`correct filler display for size ${size.toUpperCase()}`, () => {
                cy.tuiVisit(`components/input-date`);

                getInputBy(size).click();
                matchImageSnapshot(`examples-input-date-size-${size}-filled`);

                getInputBy(size).type(`{selectall}{backspace}`);
                matchImageSnapshot(`examples-input-date-size-${size}-cleared`);

                getInputBy(size).type(`01.`);
                matchImageSnapshot(`examples-input-date-size-${size}-set-day`);

                getInputBy(size).type(`06.1994`);
                matchImageSnapshot(`examples-input-date-size-${size}-set-full`);
            });
        }

        function getInputBy(size: string): Cypress.Chainable<JQuery> {
            return cy
                .get(`tui-doc-example[heading="sizes"]`)
                .findByAutomationId(`tui-doc-example`)
                .tuiScrollIntoView()
                .get(`tui-input-date[tuiTextFieldSize="${size}"]`)
                .findByAutomationId(`tui-primitive-textfield__native-input`);
        }
    });

    describe(`API`, () => {
        for (const size of [`s`, `m`, `l`]) {
            it(`correct filler display for size ${size.toUpperCase()}`, () => {
                cy.tuiVisit(
                    `components/input-date/API?tuiMode=null&tuiTextfieldSize=${size}`,
                );

                getInput().click();
                matchImageSnapshot(`api-input-date-size-${size}-filled`);

                getInput().type(`01.`);
                matchImageSnapshot(`api-input-date-size-${size}-set-day`);

                getInput().type(`06.1994`);
                matchImageSnapshot(`api-input-date-size-${size}-set-full`);
            });
        }

        it(`Maximum month less than current month`, () => {
            cy.tuiVisit(`components/input-date/API?tuiMode=null&max$=1`);

            getInput().click();
            matchImageSnapshot(`input-date-maximum-month`);
        });

        it(`Minimum month more than current month`, () => {
            cy.tuiVisit(`components/input-date/API?tuiMode=null&min$=3`);

            getInput().click();
            matchImageSnapshot(`input-date-minimum-month`);
        });

        function getInput(): Cypress.Chainable<JQuery> {
            return cy
                .get(`#demoContent`)
                .findByAutomationId(`tui-primitive-textfield__native-input`);
        }
    });
});

function matchImageSnapshot(name: string): void {
    cy.matchImageSnapshot(name, {capture: `viewport`});
}
