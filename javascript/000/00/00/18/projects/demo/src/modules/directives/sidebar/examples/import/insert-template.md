```html
<button
  tuiButton
  type="button"
  (click)="toggle(true)"
  (tuiActiveZoneChange)="toggle($event)"
>
  Show sidebar
  <div *tuiSidebar="open">Content</div>
</button>
```
