import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactSelectionServiceService {

  private contactSelectionEvent = new Subject<string | null>();

  constructor() { }

  public changeSelectedContact(contactName: string) {
    this.contactSelectionEvent.next(contactName);
  }

  public getSelectedContact(): Observable<string | null> {
    return this.contactSelectionEvent.asObservable();
  }
}
