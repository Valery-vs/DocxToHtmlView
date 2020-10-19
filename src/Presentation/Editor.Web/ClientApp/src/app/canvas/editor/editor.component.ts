import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Document } from '../model/document';
import { DocumentRenderer } from '../renderers/documentRenderer';
import { DocumentService } from '../services/documentService';
import { Selection } from './selection';

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

  private _selection: Selection;
  private _ctx: CanvasRenderingContext2D;
  private _requestId: number;

  public inputFocused: boolean;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
    this._ctx = this.canvasElement.nativeElement.getContext('2d');
    // this.canvasElement.nativeElement.width = this.editorElement.nativeElement.width;
    // this.canvasElement.nativeElement.height = this.editorElement.nativeElement.height;
    DocumentService.Measure(this.document, this._ctx);

    this.ngZone.runOutsideAngular(() => this.draw());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this._requestId);
  }

  draw(): void {
    this._ctx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

    DocumentService.Measure(this.document, this._ctx);
    DocumentRenderer.Draw(this.document, this._ctx);

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

  onKeyDown(e) {
    let handled = true;
    switch (e.keyCode) {
        case 37: // Left arrow
            this._selection.MoveLeft();
            break;
        case 38: // Up arrow
            this._selection.MoveUp();
            break;
        case 39: // Up arrow
            this._selection.MoveRight();
            break;
        case 40: // Down arrow
            this._selection.MoveDown();
            break;
        default:
            handled = false;
    }
    return !handled;
  }
}
