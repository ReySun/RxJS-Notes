import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, NgModule, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';

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
    var that = this;
    if (this.jsPath !== '') {
      this.http.get(this.jsPath)
        .subscribe(x => {
          that.jsCode = JSON.parse(JSON.stringify(x))._body;
          that.jsEditor.setValue(that.jsCode);
          // 发射事件
          that.jsChange.emit(this.jsCode);
        })
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
    const js$ = Observable.fromEvent(that.jsEditor, 'change',
      (instance, change) => instance.getValue())
      .debounceTime(1000)

    js$.subscribe(x => console.log(x));
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [jsEditorComponent],
  exports: [jsEditorComponent]
})
export class JsEditorModule {}
