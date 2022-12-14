export type TuiAutofillFieldName =
    | 'off'
    // TuiCreditCardAutofillName
    | 'cc-name'
    | 'cc-number'
    | 'cc-csc'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-exp'
    | 'cc-type'
    // TuiNameAutofillName
    | 'name'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    // TuiAccountAutofillName
    | 'username'
    | 'new-password'
    | 'current-password'
    // TuiEmailAutofillName
    | 'email'
    // TuiAddressAutofillName
    | 'street-address'
    | 'postal-code'
    | 'country-name'
    // TuiPhoneAutofillName
    | 'tel'
    // TuiDateAutofillName
    | 'bday'
    // TuiTransactionAutofillName
    | 'transaction-currency'
    | 'transaction-amount';
