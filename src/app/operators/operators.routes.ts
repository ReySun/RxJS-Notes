import { Routes } from '@angular/router';

import { IndexComponent } from './index.component'

export const OperatorsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    pathMatch: 'full'
  }
]
