import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from '../nz-button/nz-button.module';
import { NzMenuDividerComponent } from '../nz-menu/nz-menu-divider.component';
import { NzMenuGroupComponent } from '../nz-menu/nz-menu-group.component';
import { NzMenuItemComponent } from '../nz-menu/nz-menu-item.component';
import { NzMenuComponent } from '../nz-menu/nz-menu.component';
import { NzSubMenuComponent } from '../nz-menu/nz-submenu.component';
import { MenuComponent } from './menu.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, NzButtonModule ],
  declarations: [ NzMenuComponent, NzMenuItemComponent, NzSubMenuComponent, NzMenuDividerComponent, NzMenuGroupComponent, MenuComponent ],
  exports     : [ NzMenuComponent, NzMenuItemComponent, NzSubMenuComponent, NzMenuDividerComponent, NzMenuGroupComponent ]
})
export class NzMenuModule {
}
