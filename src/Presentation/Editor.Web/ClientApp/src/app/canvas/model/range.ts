import { Position } from './position';

export class Range {
  public get End(): Position {
    return this._end;
  }

  public get Start(): Position {
    return this._start;
  }

  constructor(private _start: Position, private _end: Position) {
  }
}
