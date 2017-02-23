import { Routes, RouterModule }  from '@angular/router';

import { Users } from './users.component';
import { UsersList } from './components/usersList/usersList.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UsersList
  }
];

export const routing = RouterModule.forChild(routes);
