import { Route } from '@angular/router';
import { UserComponent } from './user.component';
// import { UserFormComponent } from './user-form/user-form.component';
// import { UserListComponent } from './user-list/user-list.component';
// import { MenuAccessRoles } from '../../shared';

export const userRoute: Route = {
  path: 'users',
  component: UserComponent,
  data: {
    authorities: [],
  },
  // children: [
  //   {
  //     path: '',
  //     component: UserListComponent,
  //     data: {
  //       roles: MenuAccessRoles['users'],
  //     },
  //   },
  //   {
  //     path: 'register',
  //     component: UserFormComponent,
  //     data: {
  //       roles: MenuAccessRoles['users'],
  //     },
  //   },
  //   {
  //     path: 'edit/:id',
  //     component: UserFormComponent,
  //     data: {
  //       roles: MenuAccessRoles['users'],
  //     },
  //   },
  // ],
};
