import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    children :[
      {
        path : '',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'gifts/:id',
        loadComponent: () => import('./home/item-details/item-details.page').then( m => m.ItemDetailsPage)
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
