import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {TuiBarSetComponent, TuiBarSetModule} from '@taiga-ui/addon-charts';
import {configureTestSuite} from '@taiga-ui/testing';

describe(`BarSet`, () => {
    @Component({
        template: `
            <tui-bar-set
                [value]="value"
                [collapsed]="collapsed"
            ></tui-bar-set>
        `,
    })
    class TestComponent {
        @ViewChild(TuiBarSetComponent)
        readonly component!: TuiBarSetComponent;

        readonly value = [10, 20, 30, 40];
        collapsed = false;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [TuiBarSetModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe(`collapsed`, () => {
        it(`has multiple bars when false`, () => {
            expect(
                fixture.debugElement.queryAll(
                    By.css(`[automation-id="tui-bar-set__bar"]`),
                ).length,
            ).toBe(4);
        });

        it(`has single bar when true`, () => {
            testComponent.collapsed = true;
            fixture.detectChanges();

            expect(
                fixture.debugElement.queryAll(
                    By.css(`[automation-id="tui-bar-set__bar"]`),
                ).length,
            ).toBe(1);
        });
    });
});
