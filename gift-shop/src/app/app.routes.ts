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
        path: 'cart',
        loadComponent: () => import('./home/cart/cart.page').then( m => m.CartPage)
      },
      {
        path: 'gifts/:id',
        children : [
          {
            path : '',
            loadComponent: () => import('./home/item-details/item-details.page').then( m => m.ItemDetailsPage)
          },
          {
            path: 'cart',
            loadComponent: () => import('./home/cart/cart.page').then( m => m.CartPage)
          },
        ],
        //loadComponent: () => import('./home/item-details/item-details.page').then( m => m.ItemDetailsPage)
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
