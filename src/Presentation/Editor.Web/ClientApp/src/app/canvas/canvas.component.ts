import { Component, OnInit } from '@angular/core';
import { DocService } from '../_services/doc.service';
import { Document } from './model/document';
import { Font } from './model/font';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html'
})
export class CanvasComponent implements OnInit  {
  doc: Document;

  constructor(private docService: DocService) {
  }

  ngOnInit() {
    this.doc = new Document();
    this.doc.AddParagraph('test1gCW', new Font('sans-serif', '14px'));
    this.doc.AddParagraph('test2gfCW', new Font('Times New Roman', '40pt'));
    this.doc.AddParagraph('test3gCW', new Font('Calibri', '40pt'));
    this.doc.AddParagraph('test4gCW123123123123', new Font('sans-serif', '20px'));
  }

  onFileSelected(files: File[]) {

    if (files == null || files.length === 0) {
      return;
    }

    const file = files[0];

    this.docService.ConvertDocxToHtml(file).then(doc => {
        console.info('converted');
      },
      error => console.error(error));
  }
}
