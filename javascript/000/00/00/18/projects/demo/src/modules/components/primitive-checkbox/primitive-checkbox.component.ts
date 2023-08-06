import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {TuiSizeL} from '@taiga-ui/core';

@Component({
    selector: `example-tui-checkbox`,
    templateUrl: `./primitive-checkbox.template.html`,
    changeDetection,
})
export class ExampleTuiPrimitiveCheckboxComponent {
    readonly exampleModule = import(`./examples/import/import-module.md?raw`);
    readonly exampleOptions = import(`./examples/import/define-options.md?raw`);
    readonly exampleHtml = import(`./examples/import/insert-template.md?raw`);

    readonly sizeVariants: readonly TuiSizeL[] = [`m`, `l`];

    size: TuiSizeL = this.sizeVariants[0];

    disabled = false;

    focused = false;

    hovered = false;

    pressed = false;

    invalid = false;

    readonly valueVariants: readonly boolean[] = [false, true];

    value = this.valueVariants[0];
}
