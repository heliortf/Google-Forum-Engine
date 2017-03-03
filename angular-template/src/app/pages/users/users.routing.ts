import { Routes, RouterModule }  from '@angular/router';

import { Users } from './users.component';
import { UsersList } from './components/usersList/index';
import { UserDetail } from './components/userDetail/index';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
      { path: '', component: UsersList },
      { path: ':id', component: UserDetail }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
