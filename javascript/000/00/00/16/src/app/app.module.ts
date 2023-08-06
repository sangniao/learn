import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { SiblingsListComponent } from './siblings-list/siblings-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    SiblingsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
