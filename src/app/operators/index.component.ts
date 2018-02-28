import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { operators } from './operators.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  htmlPath: string = '';
  cssPath: string = '';
  jsPath: string = '';
  operators: any = operators;
  types: any = [];
	public query: any;
	private routerSubscribe: any;

  operatorType: string = 'create';
  isFirst: boolean = true;
  constructor(private http: Http, private _router: Router, private _ActivatedRoute: ActivatedRoute) {
    for(let type in this.operators){
      this.types.push(type)
    }
  }
  changePath(path){
    this.htmlPath = `assets/rxjs/operator/${path}/${path}.html`;
    this.cssPath = `assets/rxjs/operator/${path}/${path}.css`;
    this.jsPath = `assets/rxjs/operator/${path}/${path}.js`;
  }
  getQueryParams() {
		this.routerSubscribe = this._ActivatedRoute.queryParams.subscribe(value => {
      if(value.operator){
        this.changePath(value.operator);
      }
      if(this.isFirst && value.type){
        this.operatorType = value.type;
        this.isFirst = false;
      }
			this.query = value;
		});
	}

  ngOnInit() {
    this.getQueryParams();
    if(this._router.url === '/operators/index'){
      this._router.navigateByUrl('/operators/index?type=create&operator=of')
    }
	}
	ngOnDestroy() {
		this.routerSubscribe.unsubscribe();
	}
}
