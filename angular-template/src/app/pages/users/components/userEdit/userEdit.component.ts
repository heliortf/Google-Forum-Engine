import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumUser, UserApi } from './../../../../swagger/index'

import 'style-loader!./userEdit.scss';



@Component({
  selector: 'users-edit',
  templateUrl: './userEdit.html',
})
export class UserEdit implements OnInit {

  protected userId: number;
  protected user: ForumUser;
  protected statusList: any = [];

  constructor(protected api: UserApi, protected route: ActivatedRoute) {
    this.user = {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      signature: "",
      status:ForumUser.StatusEnum.ACTIVE
    };
    for (let value in ForumUser.StatusEnum) {
      this.statusList.push(value);
    }
  }

  ngOnInit() {
    // Get User ID from route
    this.userId = this.route.snapshot.params['id'];

    // If id is a valid integer
    if (!isNaN(this.userId) && this.userId > 0) {
      // Searches the user
      this.api.usersIdGet(this.userId).subscribe((user) => this.user = user)
    }
    else {
      console.log("No ID received");
    }
  }

  // Updates the user
  update() {
    // Updates the user
    this.api.usersIdPut(this.userId.toString(), this.user).subscribe((user) => {
      // Shows success message      
    });
  }
}
