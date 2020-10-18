import { FontStyle } from './fontStyle';

export class Font {
  public Style: FontStyle = FontStyle.normal;

  constructor(public Family: string, public Width: string) {
  }

  public GetStyle(): string {
    let fontStyle = this.Style.toString();
    let fontSize = '';
    if (this.Style === FontStyle.bold) {
      fontStyle = 'normal';
      fontSize = 'bold';
    }

    return `${fontStyle} ${fontSize} ${this.Width} ${this.Family}`;
  }
}
