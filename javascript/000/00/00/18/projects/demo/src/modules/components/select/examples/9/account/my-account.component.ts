import {Component, Input} from '@angular/core';
import {TuiCurrencyVariants} from '@taiga-ui/addon-commerce';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

export interface MyAccount {
    name: string;
    amount: number;
    currency: TuiCurrencyVariants;
    paymentSystem: PolymorpheusContent;
}

@Component({
    selector: `my-account`,
    templateUrl: `./my-account.component.html`,
    styleUrls: [`./my-account.component.less`],
})
export class ExampleMyAccountComponent {
    @Input()
    account!: MyAccount;
}
