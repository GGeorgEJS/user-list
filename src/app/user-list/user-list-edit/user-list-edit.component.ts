import { Subscription } from 'rxjs';
import { UserListService } from './../user-list.service';
import { User } from './../../shared/user.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list-edit',
  templateUrl: './user-list-edit.component.html',
  styleUrls: ['./user-list-edit.component.scss']
})
export class UserListEditComponent implements OnInit {
  subscription: Subscription;
  editMode: boolean = false;
  editUserIndex: number;
  editedUser: User;
  submitted: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private userListService: UserListService) { }


  dataGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    city: new FormControl()
  })
  ngOnInit() {

  }

  get form() {
    return this.dataGroup.controls;
  }

  onSubmit(form) {
    this.submitted = true;

    if (this.dataGroup.invalid) {
      return;
    }

    const value = form.value;

    const newUser = new User(value.name, value.email, value.city);
    if (this.editMode) {
      this.userListService.updateUser(this.editUserIndex, newUser)
    } else {
      this.userListService.addUser(newUser);
    }
    this.close.emit();
  }

  onCancle() {
    this.close.emit();
  }

  onDelete() {
    this.userListService.deleteUser(this.editUserIndex);
    this.onCancle();
  }

}
