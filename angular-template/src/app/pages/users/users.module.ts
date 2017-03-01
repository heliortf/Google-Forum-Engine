import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './users.routing';
import { Users } from './users.component';
import { UsersList } from './components/usersList/usersList.component';
import { UsersApi, UserApi } from './../../swagger/index'
import { UserDetail } from './components/userDetail/userDetail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Users,
    UsersList,
    UserDetail
  ],
  providers: [
    UsersApi,
    UserApi
  ]
})
export class UsersModule {
}
