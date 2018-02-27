import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { SchedulersRoutes } from './schedulers.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SchedulersRoutes),
  ],
  declarations: [IndexComponent]
})
export class SchedulersModule { }
