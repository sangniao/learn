```ts
import {TUI_CHECKBOX_OPTIONS, TUI_CHECKBOX_DEFAULT_OPTIONS} from '@taiga-ui/core';

// ...

@NgModule({
  providers: [
    {
      provide: TUI_CHECKBOX_OPTIONS,
      useValue: {
        ...TUI_CHECKBOX_DEFAULT_OPTIONS,
        size: 'l',
      },
    },
  ],
  // ...
})
export class MyModule {}
```
