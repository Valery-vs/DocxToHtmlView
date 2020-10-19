import { Document } from '../model/document';
import { FontService } from './fontService';

export class DocumentService {
  public static Measure(document: Document, ctx: CanvasRenderingContext2D) {
    let yPos = 0;
    document.Paragraphs.forEach(para => {
      if (para.Metrics == null) {
        para.Metrics = FontService.MeasureParagraph(ctx, para.CurrentFont, para.Text);
        para.Metrics.Top = yPos;
      }

      yPos += para.Metrics.Height;
    });
  }
}
