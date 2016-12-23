import { Cell } from "./cell";

export class Line {
  id:number;
  isEnable:boolean = true;
  priority:number = 0;
  countCompSymbol:number = 0;
  lineCells:Cell[] = new Array<Cell>();
  constructor (values: Object = {}) {
    Object.assign( this, values );
  }
}
