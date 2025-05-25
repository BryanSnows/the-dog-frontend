import { Route } from '@angular/router';
import { DogComponent } from './dog.component';
import { DogListComponent } from './dog-list/dog-list.component';
// import { UserFormComponent } from './user-form/user-form.component';

export const dogRoute: Route = {
  path: 'dogs',
  component: DogComponent,
  data: {
    authorities: [],
  },
  children: [
    {
      path: '',
      component: DogListComponent,
    },
    // {
    //   path: 'register',
    //   component: UserFormComponent,

    // },
    // {
    //   path: 'edit/:id',
    //   component: UserFormComponent,

    // },
  ],
};
