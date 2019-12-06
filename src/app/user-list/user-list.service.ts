import { User } from './../shared/user.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class UserListService {

    usersChange = new Subject<User[]>();
    startedEdit = new Subject<number>();
    dataGroup: FormGroup = new FormGroup({
        name: new FormControl(),
        city: new FormControl(),
    })

    users: User[] = [];

    constructor() { }

    setUsers(users: User[]) {
        console.log(users);

        this.users = users;
        this.usersChange.next(users);
    }


    getUsers() {
        return [...this.users];
    }

    getUser(index: number) {
        return this.users[index];
    }

    addUser(user: User) {
        this.users.push(user);
        this.usersChange.next([...this.users])
    }

    updateUser(index: number, newUser: User) {
        this.users[index] = newUser;
        this.usersChange.next([...this.users]);
    }

    deleteUser(index: number) {
        this.users.splice(index, 1);
        this.usersChange.next([...this.users]);
    }
}