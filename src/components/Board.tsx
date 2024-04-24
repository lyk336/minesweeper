import { FC, Fragment, MouseEvent } from 'react';
import { FieldSizes, Square } from '../../scripts/field';
import SquareUnrevealed from './SquareUnrevealed';
import SquareRevealed from './SquareRevealed';

enum SquareColors {
  light = 'light',
  dark = 'dark',
}
interface IBoardProps {
  fieldSize: FieldSizes;
  fieldWidth: number;
  field: Array<Square>;
  handleSquareClick: (e: MouseEvent<HTMLDivElement>, square: Square, squareIndex: number) => void;
}

const Board: FC<IBoardProps> = ({ fieldSize, fieldWidth, field, handleSquareClick }) => {
  let i = 0;
  let color: SquareColors;
  const defineColor = (): SquareColors => {
    if (i % fieldWidth === 0) {
      color = color === SquareColors.light ? SquareColors.dark : SquareColors.light;
    }
    color = color === SquareColors.light ? SquareColors.dark : SquareColors.light;
    i++;
    return color;
  };
  return (
    <div className={`board board-${fieldSize}`}>
      {field.map((square: Square, i: number) => (
        <Fragment key={i.toString() + Math.random()}>
          {square.isRevealed && <SquareRevealed square={square} color={defineColor()} />}
          {!square.isRevealed && (
            <SquareUnrevealed
              color={defineColor()}
              handleSquareClick={(e: MouseEvent<HTMLDivElement>) => {
                handleSquareClick(e, square, i);
              }}
              isMarked={square.isMarked}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
export default Board;
