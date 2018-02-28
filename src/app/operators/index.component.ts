import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { operator } from './operators.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  htmlPath: string = 'assets/rxjs/operator/scan/scan.html';
  cssPath: string = 'assets/rxjs/operator/scan/scan.css';
  jsPath: string = 'assets/rxjs/operator/scan/scan.js';
  pp(){
    this.jsPath='assets/rxjs/operator/of/of.js'
    console.log(22);
  }
  contacts: any[];
	public query: any;
	private sub: any;
  MENU:any={
    menus:[],
    submenus:{},
    path:{}
  };
  constructor(private http: Http, private _router: Router, private _ActivatedRoute: ActivatedRoute) { //
    for(let menu in operator){
      this.MENU.menus.push(menu)
      this.MENU.submenus[menu]=[]

      for(let item in operator[menu]){
        this.MENU.submenus[menu].push(item)
        this.MENU.path[item]=operator[menu][item]
      }
    }
  }
  changePath(path){
    this.htmlPath = `assets/rxjs/operator/${path}/${path}.html`;
    this.cssPath = `assets/rxjs/operator/${path}/${path}.css`;
    this.jsPath = `assets/rxjs/operator/${path}/${path}.js`;
  }
  getQueryParams() {
		this.sub = this._ActivatedRoute.queryParams.subscribe(value => {
      this.changePath(value.operator)
      console.log(value);
			this.query = value
		});
	}

  ngOnInit() {
    this.getQueryParams();
	}
	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
