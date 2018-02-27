import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { SubjectRoutes } from './subject.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SubjectRoutes),
  ],
  declarations: [IndexComponent]
})
export class SubjectModule { }
