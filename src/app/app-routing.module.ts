import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'observable',
    loadChildren: './observable/observable.module#ObservableModule'
  },
  {
    path: 'observer',
    loadChildren: './observer/observer.module#ObserverModule'
  },
  {
    path: 'subscription',
    loadChildren: './subscription/subscription.module#SubscriptionModule'
  },
  {
    path: 'operators',
    loadChildren: './operators/operators.module#OperatorsModule'
  },
  {
    path: 'subject',
    loadChildren: './subject/subject.module#SubjectModule'
  },
  {
    path: 'schedulers',
    loadChildren: './schedulers/schedulers.module#SchedulersModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
