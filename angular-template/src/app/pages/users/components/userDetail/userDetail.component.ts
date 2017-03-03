import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumUser, UserApi } from './../../../../swagger/index'

import 'style-loader!./userDetail.scss';



@Component({
  selector: 'users-detail',
  templateUrl: './userDetail.html',
})
export class UserDetail implements OnInit {

  protected userId : number;
  protected user : ForumUser;
  protected statusList : any = [];

  constructor(protected api : UserApi, protected route : ActivatedRoute ) {
    for(let value in ForumUser.StatusEnum) {
      this.statusList.push(value);
    }
  }

  ngOnInit(){
    this.userId = this.route.snapshot.params['id'];
    if(!isNaN(this.userId) && this.userId > 0){
        // Searches the user
        this.api.usersIdGet(this.userId).subscribe((user) => this.user = user)
    }
    else {
        console.log("No ID received");
    }
  }
}
