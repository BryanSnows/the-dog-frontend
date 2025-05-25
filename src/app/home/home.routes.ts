import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { userRoute } from './user/user.routes';

export const homeRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      userRoute,
      {
        path: '',
        redirectTo: '/user',
        pathMatch: 'full',
      },
    ],
  },
];
