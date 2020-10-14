import { Component, OnInit } from '@angular/core';
import { DocService } from '../_services/doc.service';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
})
export class CanvasComponent implements OnInit {


  constructor(private docService: DocService) {

  }

  ngOnInit() {

  }



  onFileSelected(files: File[]) {

    if (files == null || files.length === 0) {
      return;
    }

    const file = files[0];

    this.docService.ConvertDocxToHtml(file).then(doc => {
        //this.editorComponent.editor.setContent(doc.content);
        //this.htmlContent = this.editorComponent.editor.getContent();
        console.info('converted');
      },
      error => console.error(error));
  }
}
