import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContact } from '../contact';
import { ContactSelectionServiceService } from '../contact-selection-service.service';

@Component({
  selector: 'ccda-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {

  constructor(private selectionService: ContactSelectionServiceService) { }

  private _gender: string = '';

  @Input() 
  get gender(): string {
    return this._gender;
  }
  
  set gender(val: string) {
    this._gender = val;

    if (this._gender === 'all') {
      this.matchingContacts = this.allContacts;
      return;
    }

    this.filterContacts();
  }

  private allContacts: IContact[] = [
    { name: 'John', gender: 'male' },
    { name: 'Angela', gender: 'female' },
    { name: 'Barry', gender: 'male' },
    { name: 'Kate', gender: 'female' },
    { name: 'Annastasia', gender: 'female' }
  ]

  matchingContacts: IContact[] = [];
  
  filterContacts(): void {
    this.matchingContacts = this.allContacts.filter(contact => contact.gender === this._gender);
  }
  
  @Output() selectionEvent = new EventEmitter<IContact>();

  selectContact(index: number): void {
    let contact = this.matchingContacts[index];

    this.selectionEvent.emit(contact);
    this.selectionService.changeSelectedContact(contact.name);
  }
}
