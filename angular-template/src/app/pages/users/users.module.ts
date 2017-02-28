import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing }       from './users.routing';
import { Users } from './users.component';
import { UsersList } from './components/usersList/usersList.component';
import { UsersApi } from './../../swagger/index'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule
  ],
  declarations: [
    Users,
    UsersList
  ],
  providers: [
    UsersApi
  ]
})
export class UsersModule {
}
