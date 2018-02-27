import { Component } from "@angular/core";

@Component({
  selector: '[menu]',
  template: `<ng-content></ng-content>`
})
export class MenuComponent{
  private _clickActive = true;
  private _inlineCollapsed = false;
  hasSubMenu = false;
  isInDropDown = false;
  
}
