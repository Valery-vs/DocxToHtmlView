import { Font } from './font';
import { TextAlign } from './textAlign';
import { ParagraphMetrics } from './paragraphMetrics';

export class Paragraph {
  public TextAlign: TextAlign;
  public Text: string;
  public Metrics: ParagraphMetrics;

  constructor(public Font: Font) {

  }
}
