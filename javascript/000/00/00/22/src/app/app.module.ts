import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DrawerComponent } from './drawer/drawer.component';
import { CommentDrawerComponent } from './comment-drawer/comment-drawer.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, DrawerComponent, CommentDrawerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
