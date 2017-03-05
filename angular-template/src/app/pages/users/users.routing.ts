import { Routes, RouterModule }  from '@angular/router';

import { Users } from './users.component';
import { UsersList } from './components/usersList/index';
import { UserDetail } from './components/userDetail/index';
import { UserEdit } from './components/userEdit/index';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
      { path: '', component: UsersList },
      { path: ':id', component: UserDetail },
      { path: ':id/edit', component: UserEdit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

