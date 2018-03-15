import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, NgModule, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { Observable } from 'rxjs'
import 'rxjs/add/operator/catch';

@Component({
  selector: 'html-editor',
  templateUrl: './html.editor.html',
  styleUrls: ['html.editor.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class htmlEditorComponent implements OnInit {
  @Input('path') htmlPath: string = '';
  @Output() htmlChange=new EventEmitter<string>();
  @ViewChild('html') html: ElementRef;

  htmlEditor: any;
  htmlCode: string = ``;

  constructor(private http: Http) {

  }

  ngOnInit() {

  }
  ngOnChanges(){
    if (this.htmlPath !== '') {
      this.http.get(this.htmlPath)
        .catch(x=>{
          return Observable.of('')
        })
        .subscribe(x => {
          if(x === ''){
            this.htmlCode = '';
          }else{
            this.htmlCode = JSON.parse(JSON.stringify(x))._body;
          }
          this.htmlEditor.setValue(this.htmlCode);
        })
    }else{
      this.htmlCode = '';
    }
    if(this.htmlEditor){
      this.htmlEditor.toTextArea()
    }
    this.htmlEditor = CodeMirror.fromTextArea(this.html.nativeElement, {
      mode: 'htmlmixed',
      theme: 'dracula',
      lineNumbers: false,
      tabSize: 2
    });
    this.htmlEditor.setValue(this.htmlCode);

    // TODO 处理change且发射事件
    const html$ = Observable.fromEvent(this.htmlEditor, 'change',
      (instance, change) => instance.getValue())
      .debounceTime(1000)

    html$.subscribe(code => {
      this.htmlChange.emit(code);
    })
  }
}


@NgModule({
  imports: [CommonModule],
  declarations: [htmlEditorComponent],
  exports: [htmlEditorComponent]
})
export class HtmlEditorModule {}
