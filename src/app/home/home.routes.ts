import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { userRoute } from './user/user.routes';
import { welcomeRoute } from './welcome/welcome.routes';

export const homeRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      welcomeRoute,
      userRoute,
      {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full',
      },
    ],
  },
];
