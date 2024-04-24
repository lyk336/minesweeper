import { indexToCoordinates, coordinatesToIndex } from './coordinates';
export enum FieldSizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

const mine: string = 'mine';
type EndGameFun = () => void;

interface ISquareProps {
  fieldWidth: number;
  fieldHeight: number;
  endGame: EndGameFun;
}

export class Square {
  private fieldWidth: number;
  private fieldHeight: number;

  public isRevealed: boolean = false;
  public square: number | string;
  public squareIndex: number;
  public isMarked: boolean = false;

  private endGame: EndGameFun;

  public revealSquare(
    field: Array<Square>,
    updateUnrevealedCount: (squareIndex: number) => void,
    isRecursion?: boolean
  ): void {
    // marked square shouldn't reveal itself
    if (this.isMarked) return;

    if (this.square === mine && !isRecursion) {
      this.isRevealed = true;
      this.endGame();
      return;
    }

    this.isRevealed = true;
    updateUnrevealedCount(this.squareIndex);
    if (this.square !== 0) {
      return;
    }

    // square should reveal adjacent squares only if there isn't any mine around it (if square === 0)
    const [squareX, squareY] = indexToCoordinates(this.fieldWidth, this.squareIndex);
    surroundingSquares((positionX: number, positionY: number) => {
      const x: number = squareX + positionX;
      const y: number = squareY + positionY;
      if (x < 0 || x >= this.fieldWidth || y < 0 || y >= this.fieldHeight) return;

      const squareIndex: number = coordinatesToIndex(this.fieldWidth, x, y);
      const square: Square = field[squareIndex];

      if (!square.isRevealed) {
        square.revealSquare(field, updateUnrevealedCount, true);
      }
    });
  }
  public mark() {
    this.isMarked = !this.isMarked;
  }

  constructor({ fieldWidth, fieldHeight, endGame }: ISquareProps, square: number | string, squareIndex: number) {
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;

    this.square = square;
    this.squareIndex = squareIndex;

    this.endGame = endGame;
  }
}

export class Field {
  public field: Array<Square>;
  public width: number;
  private height: number;
  public mineNumber: number;

  private endGame: EndGameFun;

  public createField(startingSquareIndex: number): void {
    const field: Array<number | string> = new Array(this.width * this.height).fill(0);
    const defineMinePosition = (field: Array<number | string>): number => {
      const mineIndex: number = Math.floor(Math.random() * field.length);
      const startingAreaIndexes: Array<number> = [startingSquareIndex];
      const [startingSquareX, startingSquareY] = indexToCoordinates(this.width, startingSquareIndex);
      surroundingSquares((positionX: number, positionY: number) => {
        const x: number = startingSquareX + positionX;
        const y: number = startingSquareY + positionY;
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;

        const squareIndex: number = coordinatesToIndex(this.width, x, y);
        startingAreaIndexes.push(squareIndex);
      });

      if (typeof field[mineIndex] === 'string' || startingAreaIndexes.some((square) => square === mineIndex)) {
        return defineMinePosition(field);
      }
      return mineIndex;
    };
    for (let i = 0; i < this.mineNumber; i++) {
      const minePosition: number = defineMinePosition(field);
      const [mineX, mineY] = indexToCoordinates(this.width, minePosition);
      field[minePosition] = mine;

      // add hints around the mine
      surroundingSquares((positionX: number, positionY: number) => {
        const x: number = mineX + positionX;
        const y: number = mineY + positionY;
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;

        const squareIndex: number = coordinatesToIndex(this.width, x, y);
        const square: number | string = field[squareIndex];
        if (typeof square === 'number') {
          field[squareIndex] = square + 1;
        }
      });
    }

    const squareProps: ISquareProps = {
      fieldWidth: this.width,
      fieldHeight: this.height,
      endGame: this.endGame,
    };
    this.field = field.map((square: number | string, i: number): Square => new Square(squareProps, square, i));
  }

  constructor(size: FieldSizes, endGame: EndGameFun) {
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
    this.endGame = endGame;
    const squareProps: ISquareProps = {
      fieldWidth: this.width,
      fieldHeight: this.height,
      endGame: this.endGame,
    };
    this.field = new Array(this.width * this.height)
      .fill(0)
      .map((square: number, i: number): Square => new Square(squareProps, square, i));
  }
}
type Callback = (positionX: number, positionY: number) => void;
function surroundingSquares(callback: Callback) {
  for (let positionX: number = -1; positionX <= 1; positionX++) {
    for (let positionY: number = -1; positionY <= 1; positionY++) {
      if (positionX === 0 && positionY === 0) continue;
      callback(positionX, positionY);
    }
  }
}
