import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './users.routing';
import { Users } from './users.component';
import { UsersList } from './components/usersList/usersList.component';
import { UsersApi, UserApi } from './../../swagger/index'
import { UserDetail } from './components/userDetail/userDetail.component';
import { UserEdit } from './components/userEdit/userEdit.component';
import { FePaginationModule } from './../fepagination/fepagination.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    FePaginationModule,
    routing
  ],
  declarations: [
    Users,
    UsersList,
    UserDetail,
    UserEdit
  ],
  providers: [
    UsersApi,
    UserApi
  ]
})
export class UsersModule {
}
