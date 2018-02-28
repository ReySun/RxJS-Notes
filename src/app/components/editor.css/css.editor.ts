import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { Observable } from 'rxjs'
import 'rxjs/add/operator/catch';

@Component({
  selector: 'css-editor',
  templateUrl: './css.editor.html',
  styleUrls: ['./css.editor.scss']
})
export class cssEditorComponent implements OnInit {
  @Input('path') cssPath: string = '';
  @Output() cssChange=new EventEmitter<string>();
  @ViewChild('css') css: ElementRef;

  cssEditor: any;
  cssCode: string = ``;

  constructor(private http: Http) {

  }

  ngOnInit() {

  }
  ngOnChanges(){
    if (this.cssPath !== '') {
      this.http.get(this.cssPath)
        .catch(x=>{
          return Observable.of('')
        })
        .subscribe(x => {
          if(x === ''){
            this.cssCode = ''
          }else{
            this.cssCode = JSON.parse(JSON.stringify(x))._body;
          }
          this.cssEditor.setValue(this.cssCode);
          // 发射事件
          this.cssChange.emit(this.cssCode);
        })
    }
    if(this.cssEditor){
      this.cssEditor.toTextArea()
    }
    this.cssEditor = CodeMirror.fromTextArea(this.css.nativeElement, {
      mode: 'css',
      theme: 'dracula',
      lineNumbers: false,
      tabSize:'2'
    });
    this.cssEditor.setValue(this.cssCode);

    // TODO 处理change且发射事件
    const css$ = Observable.fromEvent(this.cssEditor, 'change',
      (instance, change) => instance.getValue())
      .debounceTime(1000)

    css$.subscribe(x => console.log('css'));
  }
}


@NgModule({
  imports: [CommonModule],
  declarations: [cssEditorComponent],
  exports: [cssEditorComponent]
})
export class CssEditorModule {}
