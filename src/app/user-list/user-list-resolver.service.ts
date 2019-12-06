import { DataStorageService } from './../shared/data-storage.service';
import { User } from './../shared/user.model';
import { UserListService } from './user-list.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsersListResolver implements Resolve<any[]> {
    constructor(private userListService: UserListService, private dataStorageService: DataStorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const users = this.userListService.getUsers();

        if (users.length === 0) {
            return this.dataStorageService.fetchUsers();
        } else {
            return users;
        }
    }
}