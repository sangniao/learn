import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TUI_DEFAULT_IDENTITY_MATCHER, TuiIdentityMatcher} from '@taiga-ui/cdk';
import {
    TuiDataListModule,
    TuiHintModule,
    TuiRootModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
    TuiDataListWrapperModule,
    TuiSelectComponent,
    TuiSelectModule,
} from '@taiga-ui/kit';
import {configureTestSuite, TuiNativeInputPO, TuiPageObject} from '@taiga-ui/testing';

class Beast {
    constructor(readonly species: string, readonly trait: string, readonly id: string) {}

    toString(): string {
        return `${this.trait} ${this.species}`;
    }
}

const ITEMS = [
    new Beast(`mouse`, `Gray`, `0`),
    new Beast(`cat`, `Sly`, `1`),
    new Beast(`raccoon`, `Naughty`, `2`),
];

const CHECKMARK = `tui-select-option__checkmark`;
const MATCHER: TuiIdentityMatcher<Beast> = (item1, item2) => item1.id === item2.id;

describe(`Select`, () => {
    @Component({
        template: `
            <tui-root>
                <tui-select
                    [tuiTextfieldCleaner]="cleaner"
                    [formControl]="control"
                    [identityMatcher]="identityMatcher"
                >
                    Who stole the ball?
                    <tui-data-list-wrapper
                        *tuiDataList
                        [items]="items"
                    ></tui-data-list-wrapper>
                </tui-select>
            </tui-root>
        `,
    })
    class TestComponent {
        @ViewChild(TuiSelectComponent, {static: true})
        component!: TuiSelectComponent<string | Beast>;

        items = ITEMS;
        control = new FormControl();
        cleaner = false;
        identityMatcher: TuiIdentityMatcher<Beast> = TUI_DEFAULT_IDENTITY_MATCHER;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let pageObject: TuiPageObject<TestComponent>;
    let inputPO: TuiNativeInputPO;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                TuiSelectModule,
                TuiRootModule,
                TuiTextfieldControllerModule,
                TuiHintModule,
                TuiDataListModule,
                TuiDataListWrapperModule,
            ],
            declarations: [TestComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        pageObject = new TuiPageObject(fixture);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        inputPO = new TuiNativeInputPO(fixture, `tui-primitive-textfield__native-input`);
    });

    describe(`Cleaning the field`, () => {
        beforeEach(() => {
            testComponent.cleaner = true;
            fixture.detectChanges();
        });

        it(`delete key clears the field`, () => {
            testComponent.control.setValue(ITEMS[0]);
            fixture.detectChanges();
            inputPO.sendKeydown(`delete`);

            expect(testComponent.control.value).toBeNull();
        });

        it(`if the cross is disabled, the delete key does not clear the field`, () => {
            testComponent.cleaner = false;
            testComponent.control.setValue(ITEMS[0]);
            fixture.detectChanges();
            inputPO.sendKeydown(`delete`);

            expect(testComponent.control.value).not.toBeNull();
        });
    });

    describe(`identityMatcher`, () => {
        describe(`Default matcher`, () => {
            beforeEach(() => {
                inputPO.sendKeydown(`ArrowDown`);
            });

            it(`Considers the same object to be identical to itself`, () => {
                testComponent.control.setValue(ITEMS[0]);
                fixture.detectChanges();

                expect(pageObject.getByAutomationId(CHECKMARK)).not.toBeNull();
            });

            it(`Doesn't consider copies of objects identical`, () => {
                testComponent.control.setValue(new Beast(`mouse`, `Gray`, `0`));
                fixture.detectChanges();

                expect(pageObject.getByAutomationId(CHECKMARK)).toBeNull();
            });
        });

        describe(`Custom matcher (matching by id)`, () => {
            beforeEach(() => {
                testComponent.identityMatcher = MATCHER;
                fixture.detectChanges();
            });

            it(`Considers the same object to be identical to itself`, () => {
                testComponent.control.setValue(ITEMS[0]);
                inputPO.sendKeydown(`ArrowDown`);

                expect(pageObject.getByAutomationId(CHECKMARK)).not.toBeNull();
            });

            it(`Considers copies of objects identical`, () => {
                testComponent.control.setValue(new Beast(`mouse`, `Gray`, `0`));
                inputPO.sendKeydown(`ArrowDown`);

                expect(pageObject.getByAutomationId(CHECKMARK)).not.toBeNull();
            });
        });
    });
});
