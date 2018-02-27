import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { OperatorsRoutes } from './operators.routes';
import { NzMenuModule } from '../components/nz-menu/nz-menu.module';
import { NzButtonModule } from '../components/nz-button/nz-button.module';
import { NzTabsModule } from '../components/nz-tabs/nz-tabs.module';
import { NzLayoutModule } from '../components/nz-layout/nz-layout.module';

import { JsEditorModule } from '../components/editor.javascript/javascript.editor';
import { HtmlEditorModule } from '../components/editor.html/html.editor';
import { CssEditorModule } from '../components/editor.css/css.editor';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OperatorsRoutes),
    NzMenuModule,
    NzButtonModule,
    NzTabsModule,
    NzLayoutModule,
    JsEditorModule,
    HtmlEditorModule,
    CssEditorModule
  ],
  declarations: [IndexComponent]
})
export class OperatorsModule { }
