import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TuiHintModule, TuiRootModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputPhoneComponent, TuiInputPhoneModule} from '@taiga-ui/kit';
import {configureTestSuite, TuiNativeInputPO, TuiPageObject} from '@taiga-ui/testing';
import {NG_EVENT_PLUGINS} from '@tinkoff/ng-event-plugins';

describe(`InputPhone`, () => {
    @Component({
        template: `
            <tui-root>
                <tui-input-phone
                    [formControl]="control"
                    [readOnly]="readOnly"
                    [countryCode]="countryCode"
                    [phoneMaskAfterCountryCode]="phoneMaskAfterCountryCode"
                ></tui-input-phone>
            </tui-root>
        `,
    })
    class TestComponent {
        @ViewChild(TuiInputPhoneComponent, {static: true})
        component!: TuiInputPhoneComponent;

        control = new FormControl(`+79110330102`);
        countryCode = `+7`;
        phoneMaskAfterCountryCode = `### ###-##-##`;
        readOnly = false;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let component: TuiInputPhoneComponent;
    let pageObject: TuiPageObject<TestComponent>;
    let inputPO: TuiNativeInputPO;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                TuiRootModule,
                TuiInputPhoneModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                TuiTextfieldControllerModule,
                TuiHintModule,
            ],
            declarations: [TestComponent],
            providers: NG_EVENT_PLUGINS,
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        pageObject = new TuiPageObject(fixture);
        testComponent = fixture.componentInstance;
        component = testComponent.component;
        fixture.detectChanges();

        inputPO = new TuiNativeInputPO(fixture, `tui-primitive-textfield__native-input`);
    });

    describe(`Initial value`, () => {
        it(`The value in the field is formatted by mask`, async () => {
            await fixture.whenStable();
            expect(inputPO.value).toBe(`+7 911 033-01-02`);
        });

        it(`The original value in the formControl has not changed and does not contain brackets`, () => {
            expect(testComponent.control.value).toBe(`+79110330102`);
        });

        it(`When focusing on an empty field, the field is set "+7 "`, async () => {
            testComponent.control.reset();
            fixture.detectChanges();
            inputPO.focus();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(inputPO.value).toBe(`${testComponent.component.countryCode} `);
        });

        it(`When focusing an empty field, +7 is not added to the control"`, async () => {
            testComponent.control.reset();
            fixture.detectChanges();
            inputPO.focus();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(testComponent.control.value).toBe(null);
        });

        it(`When focusing on an empty field in readOnly mode, the field is not set "+7 "`, async () => {
            testComponent.control.reset();
            testComponent.readOnly = true;
            fixture.detectChanges();
            inputPO.focus();
            fixture.detectChanges();
            await fixture.whenStable();
            expect(inputPO.value).toBe(``);
        });

        // TODO: check why inputPO.value is +7 911 033-01-02
        xit(`When blurring from a field in which only "+7" is entered, the value is cleared`, () => {
            inputPO.nativeElement?.focus();
            inputPO.nativeElement?.blur();
            fixture.detectChanges();

            expect(inputPO.value).toBe(``);
        });
    });

    describe(`Using different codes and masks`, () => {
        beforeEach(async () => {
            await fixture.whenStable();
            testComponent.control.setValue(``);
            fixture.detectChanges();
        });

        it(`Assigning a dialing code and when focusing on an empty field, the specified code is displayed`, async () => {
            testComponent.countryCode = `+850`;
            fixture.detectChanges();
            inputPO.focus();

            await fixture.whenStable();
            fixture.detectChanges();

            expect(inputPO.value).toBe(`+850 `);
        });

        it(`Entering a number with a new code`, async () => {
            testComponent.countryCode = `+850`;
            testComponent.control.setValue(`+8508121234567`);
            fixture.detectChanges();

            await fixture.whenStable();
            fixture.detectChanges();
            expect(inputPO.value).toBe(`+850 812 123-45-67`);
        });

        it(`New mask`, async () => {
            testComponent.countryCode = `+850`;
            testComponent.phoneMaskAfterCountryCode = `#### ## ##-##`;
            testComponent.control.setValue(`+8501234567890`);
            fixture.detectChanges();

            await fixture.whenStable();
            fixture.detectChanges();
            expect(inputPO.value).toBe(`+850 1234 56 78-90`);
        });

        it(`Invalid characters passed to the mask`, async () => {
            testComponent.countryCode = `+850`;
            testComponent.phoneMaskAfterCountryCode = `(####)+___?$_:-##-@##-!##`;
            testComponent.control.setValue(`+8501234567890`);
            fixture.detectChanges();

            await fixture.whenStable();
            fixture.detectChanges();
            expect(inputPO.value).toBe(`+850 (1234)-56-78-90`);
        });
    });

    describe(`The value in the formControl changes outside`, () => {
        beforeEach(() => {
            testComponent.control.setValue(`+78121234567`);
            fixture.detectChanges();
        });

        it(`In the field a new formatted value appears`, async () => {
            await fixture.whenStable();
            fixture.detectChanges();
            expect(inputPO.value).toBe(`+7 812 123-45-67`);
        });

        it(`No parentheses are added to the new value in the formControl`, () => {
            expect(testComponent.control.value).toBe(`+78121234567`);
        });
    });

    describe(`The value in the formControl changes outside to an incomplete number`, () => {
        it(`The formatted part of the number appears in the field`, async () => {
            testComponent.control.setValue(`+78121`);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(inputPO.value).toBe(`+7 812 1`);
        });
    });

    describe(`The value in the formControl changes to empty outside`, () => {
        it(`If the value is null, the value "+7" appears in the focus field`, async () => {
            testComponent.control.setValue(null);
            fixture.detectChanges();
            inputPO.focus();

            await fixture.whenStable();
            fixture.detectChanges();
            expect(inputPO.value).toBe(`+7 `);
        });

        it(`If the value is an empty string, the value "+7" appears in the focus field`, async () => {
            testComponent.control.setValue(``);
            inputPO.focus();

            await fixture.whenStable();
            fixture.detectChanges();
            expect(inputPO.value).toBe(`+7 `);
        });

        it(`If the value was, and then deleted to +7`, async () => {
            testComponent.control.setValue(`+7999`);

            await fixture.whenStable();
            fixture.detectChanges();

            expect(inputPO.value).toBe(`+7 911 033-01-02`);
            expect(testComponent.control.value).toBe(`+7999`);

            inputPO.sendText(`+7 `);
            await fixture.whenStable();
            fixture.detectChanges();

            expect(inputPO.value).toBe(`+7 `);
            expect(testComponent.control.value).toBe(``);
        });
    });

    describe(`Entering a short phone number (less than 12 characters)`, () => {
        it(`A short phone number is passed to the formControl value`, () => {
            component.onValueChange(`+712345`);
            fixture.detectChanges();
            expect(testComponent.control.value).toBe(`+712345`);
        });
    });

    describe(`Drag & Drop Phone Input`, () => {
        beforeEach(() => {
            testComponent.control.setValue(``);
            fixture.detectChanges();
        });

        it(`If the number starts with a prefix +7`, async () => {
            await onDropRemovePrefix(`+71234567890`);
        });

        it(`If the number starts with a prefix 7`, async () => {
            await onDropRemovePrefix(`71234567890`);
        });

        it(`If the number starts with a prefix 8`, async () => {
            await onDropRemovePrefix(`81234567890`);
        });

        it(`If the number without a prefix`, async () => {
            await onDropRemovePrefix(`1234567890`);
        });

        it(`If there are unnecessary characters in the room`, async () => {
            await onDropRemovePrefix(`12%3--4(5)6ЕН78?90`);
        });
    });

    describe(`Phone input via copy / paste`, () => {
        beforeEach(() => {
            testComponent.control.setValue(``);
            fixture.detectChanges();
        });

        it(`If the number starts with a prefix +7`, async () => {
            await onPasteRemovePrefix(`+71234567890`);
        });

        it(`If the number starts with a prefix 7`, async () => {
            await onPasteRemovePrefix(`71234567890`);
        });

        it(`If the number starts with a prefix 8`, async () => {
            await onPasteRemovePrefix(`81234567890`);
        });

        it(`If the number without a prefix`, async () => {
            await onPasteRemovePrefix(`1234567890`);
        });

        it(`If there are unnecessary characters in the room`, async () => {
            await onPasteRemovePrefix(`12%3--4(5)6ЕН78?90`);
        });
    });

    function getTel(): HTMLElement {
        return pageObject.getByAutomationId(`tui-primitive-textfield__native-input`)!
            .nativeElement;
    }

    async function onPasteRemovePrefix(value: string): Promise<void> {
        const pasteEvent = new Event(`paste`, {bubbles: true});
        const clipboardData = {
            getData: () => value,
        };

        Object.defineProperty(pasteEvent, `clipboardData`, {value: clipboardData});

        fixture.detectChanges();

        getTel().dispatchEvent(pasteEvent);

        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.computedValue).toBe(`+7 123 456-78-90`);
    }

    async function onDropRemovePrefix(value: string): Promise<void> {
        const dragEvent = new Event(`drop`, {bubbles: true});
        const dataTransfer = {
            getData: () => value,
        };

        Object.defineProperty(dragEvent, `dataTransfer`, {value: dataTransfer});

        fixture.detectChanges();

        getTel().dispatchEvent(dragEvent);
        await fixture.whenStable();

        fixture.detectChanges();
        expect(component.computedValue).toBe(`+7 123 456-78-90`);
    }
});
