import { Position } from '../model/position';
import { Range } from '../model/range';

export class Selection {
  public Range: Range;

  public SetPosition(line: number, character: number) {
    this.Range = new Range(new Position(line, character), null);
  }

  public MoveDown() {

  }
  public MoveRight() {

  }
  public MoveUp() {

  }
  public MoveLeft() {

  }
}
