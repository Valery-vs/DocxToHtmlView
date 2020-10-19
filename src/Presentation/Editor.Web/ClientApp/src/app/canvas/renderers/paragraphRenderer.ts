import { Paragraph } from '../model/paragraph';

export class ParagraphRenderer {
  public static Draw(paragraph: Paragraph, ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.font = paragraph.Font.GetStyle();
    ctx.textAlign = paragraph.TextAlign.toString() as CanvasTextAlign;
    ctx.fillText(paragraph.Text, 0, paragraph.Metrics.Top + paragraph.Metrics.Baseline);
    ctx.restore();
  }
}
