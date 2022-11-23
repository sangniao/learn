import { Component } from '@angular/core';
import { IContact } from './contact';

@Component({
  selector: 'ccda-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'component-commuincations-demo-app';

  selectedGender: string = 'all';
  selectedContact: IContact | null = null;

  changeGender(gender: string) {
    this.selectedGender = gender;
    this.selectedContact = null;
  }

  recieveSelectionEvent(selectedContact: IContact): void {
    this.selectedContact = selectedContact;
  }
}
