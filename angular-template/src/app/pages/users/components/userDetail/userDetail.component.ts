import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumUser, UserApi } from './../../../../swagger/index'
import ForumUser.StatusEnum as StatusList from './../../../../swagger/index'

import 'style-loader!./userDetail.scss';



@Component({
  selector: 'users-detail',
  templateUrl: './usersDetail.html',
})
export class UsersDetail implements OnInit {

  protected userId : string;
  protected user : ForumUser;
  protected statusList : StatusList;

  constructor(protected api : UserApi, protected route : ActivatedRoute ) {
    this.statusList = StatusList;
  }

  ngOnInit(){
    this.userId = this.route.snapshop.params['id'];
    if(!isNaN(this.userId) && this.userId > 0){
        // Searches the user
        this.api.userIdGet(parseInt(this.userId)).subscribe((user) => this.user = user)
    }
    else {
        console.log("No ID received");
    }
  }
}
