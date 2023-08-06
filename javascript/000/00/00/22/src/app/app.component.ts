import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  isDrawerOpen = false;

  onClose() {
    this.isDrawerOpen = false
  }
}
