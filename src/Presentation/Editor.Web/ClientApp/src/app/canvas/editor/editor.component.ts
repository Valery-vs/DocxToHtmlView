import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Document } from '../model/document';
import { DocumentRenderer } from '../renderers/documentRenderer';
import { DocumentService } from '../services/documentService';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy  {
  @ViewChild('editor', { static: true })
  editorElement: ElementRef;

  @ViewChild('myCanvas', { static: true })
  canvasElement: ElementRef<HTMLCanvasElement>;

  @ViewChild('input', { static: true })
  inputElement: ElementRef;

  @Input()
  document: Document;

  ctx: CanvasRenderingContext2D;
  requestId: number;
  inputFocused: boolean;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
    this.ctx = this.canvasElement.nativeElement.getContext('2d');
    // this.canvasElement.nativeElement.width = this.editorElement.nativeElement.width;
    // this.canvasElement.nativeElement.height = this.editorElement.nativeElement.height;
    DocumentService.Measure(this.document, this.ctx);

    this.ngZone.runOutsideAngular(() => this.draw());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.requestId);
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

    DocumentService.Measure(this.document, this.ctx);
    DocumentRenderer.Draw(this.document, this.ctx);

    //this.requestId = requestAnimationFrame(this.draw.bind(this));
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

  onInput(e) {
    this.document.AppentText(e.target.value);
    e.target.value = '';

    this.ngZone.runOutsideAngular(() => this.draw());
  }
}
