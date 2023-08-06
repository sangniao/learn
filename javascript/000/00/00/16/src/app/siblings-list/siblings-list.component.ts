import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactSelectionServiceService } from '../contact-selection-service.service';
import { IFullContactDetails } from '../fullContactDetails';

@Component({
  selector: 'ccda-siblings-list',
  templateUrl: './siblings-list.component.html',
  styleUrls: ['./siblings-list.component.css']
})
export class SiblingsListComponent implements OnInit, OnDestroy {

  private selectionService$: Subscription | null = null;

  private allContactsFull: IFullContactDetails[] = [
    { name: 'John', gender: 'male', phone: "123-432-1355", favoriteAnimal: 'Lion', age: 20 },
    { name: 'Angela', gender: 'female', phone: "173-122-1399", favoriteAnimal: 'Cat', age: 19 },
    { name: 'Barry', gender: 'male', phone: "146-432-1758", favoriteAnimal: 'Dolphin', age: 22 },
    { name: 'Kate', gender: 'female', phone: "734-432-3131", favoriteAnimal: 'Unicorn', age: 25 },
    { name: 'Annastasia', gender: 'female', phone: "356-311-7642", favoriteAnimal: 'Penguin', age: 18 }
  ];

  selectedContact: IFullContactDetails | undefined = undefined;

  constructor(private contactSelectionService: ContactSelectionServiceService) { }

  ngOnInit(): void {
    this.selectionService$ = this.contactSelectionService.getSelectedContact().subscribe(name => {
      this.selectedContact = this.allContactsFull.find(contact => contact.name === name);
    })
  }

  ngOnDestroy(): void {
    this.selectionService$?.unsubscribe();
  }

}
