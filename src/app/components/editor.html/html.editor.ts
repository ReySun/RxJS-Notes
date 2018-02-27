import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, NgModule, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';

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
    var that = this;
    if (this.htmlPath !== '') {
      this.http.get(this.htmlPath)
        .subscribe(x => {
          that.htmlCode = JSON.parse(JSON.stringify(x))._body;
          that.htmlEditor.setValue(that.htmlCode);
          // 发射事件
          that.htmlChange.emit(this.htmlCode);
        })
    }
    this.htmlEditor = CodeMirror.fromTextArea(this.html.nativeElement, {
      mode: 'htmlmixed',
      theme: 'dracula',
      lineNumbers: false,
      tabSize: 2
    });
    this.htmlEditor.setValue(this.htmlCode);

    // TODO 处理change且发射事件
    const html$ = Observable.fromEvent(that.htmlEditor, 'change',
      (instance, change) => instance.getValue())
      .debounceTime(1000)

    html$.subscribe(x => console.log(x));
  }
}


@NgModule({
  imports: [CommonModule],
  declarations: [htmlEditorComponent],
  exports: [htmlEditorComponent]
})
export class HtmlEditorModule {}