import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { ObservableRoutes } from './observable.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ObservableRoutes),
  ],
  declarations: [IndexComponent]
})
export class ObservableModule { }
