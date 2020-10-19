import { Font } from '../model/font';
import { ParagraphMetrics } from '../model/paragraphMetrics';

export class FontService {
  public static MeasureParagraph(ctx: CanvasRenderingContext2D, font: Font, text: string): ParagraphMetrics {
    ctx.save();

    ctx.font = font.GetStyle();
    const metrics = ctx.measureText('Wg');
    const paraMetrics = new ParagraphMetrics();
    paraMetrics.Width = metrics.width;
    paraMetrics.Height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    paraMetrics.Baseline = metrics.actualBoundingBoxAscent;
    ctx.restore();

    return paraMetrics;
  }
}
