import { Font } from './font';
import { TextAlign } from './textAlign';
import { ParagraphMetrics } from './paragraphMetrics';

export class Paragraph {
  private _text: string;
  private _textAlign: TextAlign = TextAlign.left;

  public get TextAlign(): TextAlign {
    return this._textAlign;
  }

  public get Text(): string {
    return this._text;
  }

  public Metrics: ParagraphMetrics;

  constructor(public CurrentFont: Font) {

  }

  public SetText(text: string) {
    this._text = text;
    this.Metrics = null;
  }
}
