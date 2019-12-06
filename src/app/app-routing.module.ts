import { UsersListResolver } from './user-list/user-list-resolver.service';
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from './user-list/user-list.component';
import { NgModule } from '@angular/core';

const appRoute: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UserListComponent, resolve: [UsersListResolver] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})

export class AppRoutingModule { }