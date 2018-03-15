import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { operators } from './operators.model';

import { Observable } from 'rxjs'
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @ViewChild('output') output;
  outputElement: HTMLIFrameElement;
  @ViewChild('console') console;
  consoleElement: any;
  htmlPath: string = '';
  cssPath: string = '';
  jsPath: string = '';
  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';
  operators: any = {};
  operatorsData = operators;
  types: any = [];
	public query: any;
	private routerQueryParams: any;
	private routerFragment: any;
	private routerCombine: any;

  operatorType: string = 'create';
  isFirst: boolean = true;
  constructor(private http: Http, private _router: Router, private _ActivatedRoute: ActivatedRoute) {

    for(let type in operators){
      this.types.push(type)
      this.operators[type] = []
      for(let operator in operators[type]){
        this.operators[type].push(operator)
      }
    }
  }
  changePath(type: string, operator: string, fragment: string = ''){
    this.htmlPath = this.cssPath = this.jsPath = '';
    this.htmlCode = this.cssCode = this.jsCode = '';
    var links = fragment.split(',');
    for(var i in links){
      if(links[i].toLowerCase() === 'html'){
        this.htmlPath = `${this.operatorsData[type][operator]['path']}/${operator}.html`;
      }else if(links[i].toLowerCase() === 'css'){
        this.cssPath = `${this.operatorsData[type][operator]['path']}/${operator}.css`;
      }else if(links[i].toLowerCase() === 'js'){
        this.jsPath = `${this.operatorsData[type][operator]['path']}/${operator}.js`;
      }
    }
  }
  getQueryParams() {
    this.routerFragment = this._ActivatedRoute.fragment;
    this.routerQueryParams = this._ActivatedRoute.queryParams;
    this.routerCombine = Observable.combineLatest(this.routerFragment, this.routerQueryParams, (fragment, queryParams) => Object.assign({}, queryParams, {"fragment": fragment}))
      .subscribe((value: any)=>{
        if(value.operator){
          this.changePath(value.type, value.operator, value.fragment);
        }
        if(this.isFirst && value.type){
          this.operatorType = value.type;
          this.isFirst = false;
        }
        this.query = value;
      })
  }
  cssChange(code: string){
    this.cssCode = code;
    this.renderOutput(this.outputElement, this.htmlCode, this.cssCode, this.jsCode)
    this.renderConsole()
  }
  jsChange(code: string){
    this.jsCode = code;
    // console.log(this.jsCode);
    this.renderOutput(this.outputElement, this.htmlCode, this.cssCode, this.jsCode)
    this.renderConsole()
  }
  htmlChange(code: string){
    this.htmlCode = code;
    this.renderOutput(this.outputElement, this.htmlCode, this.cssCode, this.jsCode)
    this.renderConsole()
  }
  renderOutput(iframe, html, css?, js?){
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    let consoleScript = document.createElement('script');
    consoleScript.src='https://unpkg.com/console-in-dom@1.3.0/console.min.js';
    iframe.contentWindow.document.head.appendChild(consoleScript);
    var script = document.createElement('script');
    script.text = `var originConsole = console;
    var console = ConsoleInDom.render(
      parent.document.getElementById('console')
    );
    try {
      ${js}
    } catch (error) {
      console.log(error.name +': '+ error.message);
      originConsole.log(error);
    }`;
    var style = document.createElement('style');
    style.innerHTML = css;
    setTimeout(() =>{ // any other way?
      iframe.contentWindow.document.body.appendChild(script);
      iframe.contentWindow.document.head.appendChild(style);
    }, 1000)
    iframe.contentWindow.document.close();
  }
  renderConsole(){
    // this.consoleElement.createShadowRoot().innerHTML='AWD';
    // var link = document.createElement('link');
    // link.href = 'https://unpkg.com/console-in-dom@1.3.0/console.css';
    // link.rel = 'stylesheet';
    // this.consoleElement.createShadowRoot().appendChild(link)
  }
  ngOnInit() {
    this.outputElement = this.output.nativeElement;
    this.consoleElement = this.console.nativeElement;

    var link = document.createElement('link');
    link.href = 'https://unpkg.com/console-in-dom@1.3.0/console.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link)

    this.getQueryParams();
    if(this._router.url === '/operators/index'){
      this._router.navigateByUrl('/operators/index?type=create&operator=of#html,js')
    }
	}
	ngOnDestroy() {
		this.routerCombine.unsubscribe();
	}
}
