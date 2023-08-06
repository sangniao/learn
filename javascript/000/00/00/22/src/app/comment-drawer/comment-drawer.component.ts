import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-drawer',
  templateUrl: './comment-drawer.component.html',
  styleUrls: ['./comment-drawer.component.scss']
})
export class CommentDrawerComponent {

  constructor() { }

  @Input() isOpen = false;
  @Output() closed = new EventEmitter();

  close() {
    this.closed.emit();
  }

}