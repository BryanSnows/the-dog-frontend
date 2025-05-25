import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { dogRoute } from './dog/dog.routes';
import { welcomeRoute } from './welcome/welcome.routes';

export const homeRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      welcomeRoute,
      dogRoute,
      {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full',
      },
    ],
  },
];
