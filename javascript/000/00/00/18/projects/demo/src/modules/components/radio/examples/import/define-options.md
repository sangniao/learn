```ts
import {TUI_RADIO_OPTIONS, TUI_RADIO_DEFAULT_OPTIONS} from '@taiga-ui/core';

// ...

@NgModule({
  providers: [
    {
      provide: TUI_RADIO_OPTIONS,
      useValue: {
        ...TUI_RADIO_DEFAULT_OPTIONS,
        size: 'l',
      },
    },
  ],
  // ...
})
export class MyModule {}
```
