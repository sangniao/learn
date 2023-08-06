import {Component, Inject} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {USER_AGENT} from '@ng-web-apis/common';
import {tuiIsEdge, tuiIsEdgeOlderThan, tuiIsFirefox} from '@taiga-ui/cdk';

@Component({
    selector: `tui-browser-example-1`,
    templateUrl: `./index.html`,
    changeDetection,
    encapsulation,
})
export class TuiBrowserExample1 {
    constructor(@Inject(USER_AGENT) private readonly userAgent: string) {}

    get aboutMyBrowser(): string {
        if (tuiIsEdge(this.userAgent)) {
            if (tuiIsEdgeOlderThan(13, this.userAgent)) {
                return `Edge older than 13`;
            }

            return `Edge until 13`;
        }

        if (tuiIsFirefox(this.userAgent)) {
            return `Okay, you have Firefox!`;
        }

        return `You have Chromium based browser, cool!`;
    }
}
