import { Component, OnInit } from '@angular/core';
import { UsersApi } from './../../../../swagger/index'

import 'style-loader!./usersList.scss';

@Component({
  selector: 'users-list',
  templateUrl: './usersList.html',
})
export class UsersList implements OnInit {

  protected usersList = [];
  protected pagination = {}; 

  constructor(public api : UsersApi) {

  }

  
  ngOnInit(){
    let self = this;
    this.api.usersGet().subscribe((users) => {
       self.usersList = users.records;
       self.pagination = users.pagination 
    });
  }
}
