import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, NgModule, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { Observable } from 'rxjs'
import 'rxjs/add/operator/catch';

@Component({
  selector: 'js-editor',
  templateUrl: './javascript.editor.html',
  styleUrls: ['./javascript.editor.scss'],
  encapsulation: ViewEncapsulation.None
})
export class jsEditorComponent implements OnInit {
  @Input('path') jsPath: string;
  @Output() jsChange=new EventEmitter<string>();
  @ViewChild('javascript') javascript: ElementRef;

  jsEditor: any;
  jsCode: string = ``;
  constructor(private http: Http) {

  }

  ngOnInit() {

  }
  ngOnChanges(){
    if (this.jsPath !== '') {
      this.http.get(this.jsPath)
        .catch(x=>{
          return Observable.of('')
        })
        .subscribe(x => {
          if(x === ''){
            this.jsCode = '';
          }else{
            this.jsCode = JSON.parse(JSON.stringify(x))._body;
          }
          this.jsEditor.setValue(this.jsCode);
          // 发射事件

        })
    }else{
      this.jsCode = '';
    }
    if(this.jsEditor){
      this.jsEditor.toTextArea()
    }
    this.jsEditor = CodeMirror.fromTextArea(this.javascript.nativeElement, {
      mode: "javascript",
      theme: 'dracula',
      lineNumbers: false,
      readOnly: false,
      value: ''
    });
    this.jsEditor.setValue(this.jsCode);

    // TODO 处理change且发射事件
    const js$ = Observable.fromEvent(this.jsEditor, 'change',
      (instance, change) => instance.getValue())
      .debounceTime(1000)

    js$.subscribe(code => {
      this.jsChange.emit(code);
    });
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [jsEditorComponent],
  exports: [jsEditorComponent]
})
export class JsEditorModule {}
