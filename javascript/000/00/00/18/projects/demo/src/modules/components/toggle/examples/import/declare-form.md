```ts
import {FormControl, FormGroup} from '@angular/forms';

// ...

@Component({
  // ...
})
export class MyComponent {
  testForm = new FormGroup({
    testValue: new FormControl(),
  });
}
```
