import { PlaceHolderDirective } from './../shared/placeholder.directive';
import { UserListEditComponent } from './user-list-edit/user-list-edit.component';
import { User } from './../shared/user.model';
import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { UserListService } from './user-list.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[];
  edit: boolean = false;
  private closeSub: Subscription;
  @ViewChild(PlaceHolderDirective, { static: false }) userHost: PlaceHolderDirective;
  private usersChangeSub: Subscription;

  constructor(private userListService: UserListService, private componentFactoryResolver: ComponentFactoryResolver, private builder: FormBuilder) { }

  ngOnInit() {
    this.usersChangeSub = this.userListService.usersChange.subscribe((users: User[]) => {
      this.users = users;
    })
    this.users = this.userListService.getUsers();
  }

  onEdit(user: User, index: number) {
    this.edit = true;
    this.showModalWindow(user, index)
  }

  showModalWindow(user: User, index: number) {
    const userEditFactory = this.componentFactoryResolver.resolveComponentFactory(UserListEditComponent);
    const hostViewContainerRef = this.userHost.viewContainerRef;

    const componentRef = hostViewContainerRef.createComponent(userEditFactory)
    if (user) {
      componentRef.instance.dataGroup = this.builder.group({
        name: [user.name, [Validators.required]],
        email: [user.email, [Validators.required, Validators.email]],
        city: user.city
      })
      componentRef.instance.editUserIndex = index;
      componentRef.instance.editMode = true;
    }


    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.edit = false;
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

  }

  ngOnDestroy() {
    this.usersChangeSub.unsubscribe();
  }

}
