import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  exportAs: "drawer"
})
export class DrawerComponent {

 @Input() isOpen = false;
  @Input() width: number = 400;
  @Input() position: 'left' | 'right' = 'right';

  @Output() drawerClosed = new EventEmitter();

  close() {
    this.drawerClosed.emit();
  }
}