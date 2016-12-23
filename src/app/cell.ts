
export class Cell {
  id:number;
  enabled:boolean = true;
  symbol:string = '';
  xCoord:number;
  yCoord:number;
  
  constructor (values: Object = {}) {
    Object.assign( this, values );
  }
}
