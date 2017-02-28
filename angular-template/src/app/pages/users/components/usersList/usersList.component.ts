import { Component, OnInit } from '@angular/core';
import { UsersApi } from './../../../../swagger/index'

import 'style-loader!./usersList.scss';



@Component({
  selector: 'users-list',
  templateUrl: './usersList.html',
})
export class UsersList implements OnInit {

  protected usersList = [];

  constructor(public api : UsersApi) {
    
  }

  ngOnInit(){
     this.api.usersGet().subscribe((users) => this.usersList = users);
  }
}
