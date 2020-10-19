export class Position {

  public get Line(): number {
    return this._line;
  }

  public get Character(): number {
    return this._character;
  }

  constructor(private _line: number, private _character: number) {

  }
}
