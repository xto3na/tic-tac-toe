import { Cell } from "./cell";

export class Line {
  id:number;
  lineCells:Cell[] = [];
  constructor (values: Object = {}) {
    Object.assign( this, values );
  }
}
