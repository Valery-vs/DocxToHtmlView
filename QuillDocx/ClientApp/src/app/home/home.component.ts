import { Component, OnInit } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { DocService } from '../_services/doc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  public content: string;
  private editor: QuillEditorComponent;

  constructor(private docService: DocService) {

  }

  ngOnInit() {
  }

  onEditorCreated(editor: QuillEditorComponent)  {
    this.editor = editor;
  }
  onFileSelected(files: File[]) {
    if (files == null || files.length === 0) {
      return;
    }

    const file = files[0];

    this.docService.ConvertDocxToHtml(file).then(doc => {
        this.content = doc.content;
        this.editor.content = doc.content;
        console.info(this.editor.content, doc.content);
        //this.editor.modules.clipboard.dangerouslyPasteHTML('&nbsp;<b>World</b>');
      },
      error => console.error(error));
  }
}
