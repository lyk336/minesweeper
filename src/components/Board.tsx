import { FC } from 'react';
import { FieldSizes, Square } from '../../scripts/field';

interface IBoardProps {
  fieldSize: FieldSizes;
  field: Array<Square>;
}

const Board: FC<IBoardProps> = ({ fieldSize, field }) => {
  const defineColor = () => {};
  return (
    <div className={`board board-${fieldSize}`}>
      {field.map((square: Square) => (
        <>
          {square.isActivated && (
            <div className='square'>
              {square.square === 'mine' ? (
                <img src='../assets/src/mine.png' />
              ) : (
                <div className={`square mines-${square.square}`}>{square.square}</div>
              )}
            </div>
          )}
          {!square.isActivated && <div className='square'></div>}
        </>
      ))}
    </div>
  );
};
export default Board;
