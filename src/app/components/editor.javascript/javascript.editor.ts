// import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, NgModule, ViewEncapsulation } from '@angular/core';
// import { Observable } from 'rxjs'
// import { Http } from '@angular/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'js-editor',
//   templateUrl: './javascript.editor.html',
//   styleUrls: ['./javascript.editor.scss'],
//   encapsulation: ViewEncapsulation.None
// })
// export class jsEditorComponent implements OnInit {
//   @Input('path') jsPath: string = '';
//   @Output() jsChange=new EventEmitter<string>();
//   @ViewChild('javascript') javascript: ElementRef;

//   jsEditor: any;
//   jsCode: string = `// the javascript code here`;
//   constructor(private http: Http) {

//   }

//   ngOnInit() {
//     var that = this;
//     if (this.jsPath !== '') {
//       this.http.get(this.jsPath)
//         .subscribe(x => {
//           that.jsCode = JSON.parse(JSON.stringify(x))._body;
//           that.jsEditor.setValue(that.jsCode);
//           // 发射事件
//           that.jsChange.emit(this.jsCode);
//         })
//     }
//     this.jsEditor = CodeMirror.fromTextArea(this.javascript.nativeElement, {
//       mode: "javascript",
//       theme: 'dracula',
//       lineNumbers: false,
//       readOnly: false,
//       value: ''
//     });
//     this.jsEditor.setValue(this.jsCode);

//     // TODO 处理change且发射事件
//     const js$ = Observable.fromEvent(that.jsEditor, 'change',
//       (instance, change) => instance.getValue())
//       .debounceTime(1000)
//     // .map(buildTag('script', {type: 'application/javascript'}, function (code) {
//     //   //Naive way of preventing this from polluting the global namespace
//     //   return `;(${consoleProxy.toString().trim()})();
//     //     (function wrapper() {
//     //           ${code}\n
//     //     })()\n`;
//     // }));
//     // js$.subscribe(x => eval(x));
//   }
// }


// @NgModule({
//   imports: [CommonModule],
//   declarations: [jsEditorComponent],
//   exports: [jsEditorComponent]
// })
// export class JsEditorModule {}
