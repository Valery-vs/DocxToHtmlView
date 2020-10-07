import { Component, OnInit } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { DocService } from '../_services/doc.service';

@Component({
  selector: 'app-tinyMce',
  templateUrl: './tinyMce.component.html',
})
export class TinyMceComponent implements OnInit {
  public htmlContent: string;
  public content: string;
  private editor: QuillEditorComponent;

  constructor(private docService: DocService) {

  }

  ngOnInit() {
  }

  onEditorCreated(editor: QuillEditorComponent)  {
    this.editor = editor;
    this.editor.content = 'test';
  }

  onFileSelected(files: File[]) {
    if (files == null || files.length === 0) {
      return;
    }

    const file = files[0];

    this.docService.ConvertDocxToHtml(file).then(doc => {
        console.info('converted');
        this.content = doc.content;
      },
      error => console.error(error));
  }

  onContentChanged(event) {
    this.htmlContent = event.html;
  }
}
