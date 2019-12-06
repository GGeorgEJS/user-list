import { DataStorageService } from './shared/data-storage.service';
import { UsersListResolver } from './user-list/user-list-resolver.service';
import { AppRoutingModule } from './app-routing.module';
import { PlaceHolderDirective } from './shared/placeholder.directive';
import { UserListService } from './user-list/user-list.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListEditComponent } from './user-list/user-list-edit/user-list-edit.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserListEditComponent,
    PlaceHolderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserListEditComponent]
})
export class AppModule { }
