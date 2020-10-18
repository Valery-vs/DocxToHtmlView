import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DocService } from '../_services/doc.service';
import { Document } from './model/document';
import { Font } from './model/font';
import { DocumentRenderer } from './renderers/documentRenderer';
import { DocumentService } from './services/documentService';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, OnDestroy  {
  @ViewChild('myCanvas', { static: true })
  myCanvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('input', { static: true })
  inputElement: ElementRef;

  ctx: CanvasRenderingContext2D;
  requestId: number;
  inputFocused: boolean;
  doc: Document;

  constructor(private docService: DocService, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');

    this.doc = new Document();
    this.doc.AddParagraph('test1', new Font('sans-serif', '14px'));
    this.doc.AddParagraph('test2', new Font('Times New Roman', '40pt'));
    this.doc.AddParagraph('test3', new Font('Calibri', '40pt'));
    this.doc.AddParagraph('test4', new Font('sans-serif', '20px'));
    DocumentService.Measure(this.doc, this.ctx);

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.requestId);
  }

  animate(): void {
    DocumentRenderer.Draw(this.doc, this.ctx);

    //this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  onFocus() {
    this.inputElement.nativeElement.focus();
  }

  onInputFocus() {
    this.inputFocused = true;
  }

  onInputBlur() {
    this.inputFocused = false;
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
