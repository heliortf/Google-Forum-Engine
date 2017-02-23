import { Component } from '@angular/core';

import 'style-loader!./usersList.scss';

@Component({
  selector: 'users-list',
  templateUrl: './usersList.html',
})
export class UsersList {

  protected usersList = [];

  constructor() {
    
  }

  
}
