import { UserListService } from './../user-list/user-list.service';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private userListService: UserListService) { }


    fetchUsers() {
        return this.http
            .get<any[]>('https://jsonplaceholder.typicode.com/users')
            .pipe(
                tap(users => {
                    users = users.map(user => {
                        return {
                            name: user.name,
                            email: user.email,
                            city: user.address.city
                        }
                    })

                    this.userListService.setUsers(users);
                }),
                map(users => {

                    if (!users) {
                        return users;
                    }
                    users = users.map(user => {
                        return {
                            name: user.name,
                            email: user.email,
                            city: user.address.city
                        }
                    })
                    console.log(users);

                    return users;
                })
            )

    }

}