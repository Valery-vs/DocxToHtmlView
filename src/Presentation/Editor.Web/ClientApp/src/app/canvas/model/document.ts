import { stringify } from 'querystring';
import { Font } from './font';
import { Paragraph } from './paragraph';

export class Document {
  public static DefaultFont = new Font('sans-serif', '14px');
  private _paragraphs = Array<Paragraph>();

  public get Paragraphs() {
    return this._paragraphs;
  }

  public AddParagraph(text: string, font: Font): Paragraph {
    const para = new Paragraph(font);
    para.SetText(text);
    this._paragraphs.push(para);

    return para;
  }

  GetText(): string {
    return this.Paragraphs.map(paragraph => paragraph.Text).join('\n');
  }

  public AppentText(text: string) {
    const lines = text.split('\n');

    let lastParagraph: Paragraph;
    if (this.Paragraphs.length > 0) {
      lastParagraph = this.Paragraphs[this.Paragraphs.length - 1];
    } else {
      lastParagraph = new Paragraph(Document.DefaultFont);
    }

    lines.forEach((line, index) => {
      if (index === 0) {
        lastParagraph.SetText(lastParagraph.Text + line);
      } else {
        lastParagraph = new Paragraph(lastParagraph.CurrentFont);
        lastParagraph.SetText(line);
        this._paragraphs.push(lastParagraph);
      }
    });
  }
}
