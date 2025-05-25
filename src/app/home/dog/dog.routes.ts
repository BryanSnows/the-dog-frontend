import { Route } from '@angular/router';
import { DogComponent } from './dog.component';
import { DogListComponent } from './dog-list/dog-list.component';

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
    //   component: DogFormComponent,

    // },
    // {
    //   path: 'edit/:id',
    //   component: DogFormComponent,

    // },
  ],
};
