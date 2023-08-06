import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TuiLetModule} from '@taiga-ui/cdk';
import {configureTestSuite} from '@taiga-ui/testing';

describe(`Let`, () => {
    @Component({
        template: `
            <div
                *tuiLet="getter as value"
                #test
            >
                {{ value }}{{ value }}{{ value }}
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        @ViewChild(`test`)
        elementRef!: ElementRef;

        counter = 0;

        get getter(): string {
            this.counter++;

            return `!`;
        }
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [TuiLetModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it(`Result is shown 3 times`, () => {
        expect(testComponent.elementRef.nativeElement.textContent!.trim()).toBe(`!!!`);
    });

    it(`Getter is called once`, () => {
        expect(testComponent.counter).toBe(1);
    });
});
