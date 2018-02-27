import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { SubscriptionRoutes } from './subscription.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SubscriptionRoutes),
  ],
  declarations: [IndexComponent]
})
export class SubscriptionModule { }
