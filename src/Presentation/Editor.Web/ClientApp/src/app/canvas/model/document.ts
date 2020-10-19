import { Font } from './font';
import { Paragraph } from './paragraph';

export class Document {
  private _paragraphs = Array<Paragraph>();

  public get Paragraphs() {
    return this._paragraphs;
  }

  public AddParagraph(text: string, font: Font): Paragraph {
    const para = new Paragraph(font);
    para.Text = text;
    this._paragraphs.push(para);

    return para;
  }
}
