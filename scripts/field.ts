import { indexToCoordinates, coordinatesToIndex } from './coordinates';
export enum FieldSizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}
export class Square {
  public isActivated: boolean = false;
  public square: number | string;

  constructor(square: number | string) {
    this.square = square;
  }
}

const mine: string = 'mine';
export class Field {
  public field: Array<Square>;
  public width: number;
  public mineNumber: number;
  private height: number;

  public createField(startingSquareIndex: number): void {
    const field: Array<number | string> = new Array(this.width * this.height).fill(0);
    function defineMinePosition(field: Array<number | string>): number {
      const minePosition: number = Math.floor(Math.random() * field.length);
      if (typeof field[minePosition] === 'string' || minePosition === startingSquareIndex) {
        return defineMinePosition(field);
      }
      return minePosition;
    }
    for (let i = 0; i < this.mineNumber; i++) {
      const minePosition: number = defineMinePosition(field);
      const [mineX, mineY] = indexToCoordinates(this.width, minePosition);
      field[minePosition] = mine;

      // add hints around the mine
      for (let positionX: number = -1; positionX <= 1; positionX++) {
        for (let positionY: number = -1; positionY <= 1; positionY++) {
          if (positionX === 0 && positionY === 0) continue;
          const x: number = mineX + positionX;
          const y: number = mineY + positionY;

          const squareIndex: number = coordinatesToIndex(this.width, x, y);
          const square: number | string = field[squareIndex];
          if (typeof square === 'number') {
            field[squareIndex] = square + 1;
          }
        }
      }
    }

    this.field = field.map((square: number | string): Square => new Square(square));
  }

  constructor(size: FieldSizes) {
    switch (size) {
      case FieldSizes.small:
        this.width = 10;
        this.height = 8;
        this.mineNumber = 10;
        break;
      case FieldSizes.medium:
        this.width = 18;
        this.height = 14;
        this.mineNumber = 40;
        break;
      case FieldSizes.large:
        this.width = 24;
        this.height = 20;
        this.mineNumber = 99;
        break;
    }
    this.field = new Array(this.width * this.height).fill(0).map((square: number): Square => new Square(square));
  }
}
