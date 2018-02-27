import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { ObserverRoutes } from './observer.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ObserverRoutes),
  ],
  declarations: [IndexComponent]
})
export class ObserverModule { }
