import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Observable } from 'rxjs'
import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { log } from 'util';

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
    var that = this;
    if (this.cssPath !== '') {
      this.http.get(this.cssPath)
        .subscribe(x => {
          that.cssCode = JSON.parse(JSON.stringify(x))._body;
          that.cssEditor.setValue(that.cssCode);
          // 发射事件
          that.cssChange.emit(this.cssCode);
        })
    }
    this.cssEditor = CodeMirror.fromTextArea(this.css.nativeElement, {
      mode: 'css',
      theme: 'dracula',
      lineNumbers: false,
      tabSize:'2'
    });
    this.cssEditor.setValue(this.cssCode);

    // TODO 处理change且发射事件
    const css$ = Observable.fromEvent(that.cssEditor, 'change',
      (instance, change) => instance.getValue())
      .debounceTime(1000)

    css$.subscribe(x => console.log(x));
  }
}


@NgModule({
  imports: [CommonModule],
  declarations: [cssEditorComponent],
  exports: [cssEditorComponent]
})
export class CssEditorModule {}
