import { Component, OnInit } from '@angular/core';
import { ForumUser, UsersApi } from './../../../../swagger/index'

import 'style-loader!./usersList.scss';



@Component({
  selector: 'users-list',
  templateUrl: './usersList.html',
})
export class UsersList implements OnInit {

  protected usersList = [];

  constructor(protected api: UsersApi) {
    
  }

  ngOnInit(){
    this.api.usersGet().subscribe((usuarios) => {
       console.log("Consultou!");
       console.log(usuarios);
    });
  }
}
