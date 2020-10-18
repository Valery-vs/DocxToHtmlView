import { Document } from '../model/document';
import { ParagraphRenderer } from './paragraphRenderer';

export class DocumentRenderer {
  public static Draw(document: Document, ctx: CanvasRenderingContext2D) {
    document.Paragraphs.forEach(para => {
      ParagraphRenderer.Draw(para, ctx);
    });
  }
}
