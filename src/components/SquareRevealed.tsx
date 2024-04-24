import { FC } from 'react';
import { Square } from '../../scripts/field';

interface ISquareRevealedProps {
  square: Square;
  color: string;
}

const SquareRevealed: FC<ISquareRevealedProps> = ({ square, color }) => {
  return (
    <div className={`square square-${color} square-revealed`}>
      {square.square === 'mine' ? (
        <img src='src/assets/mine.png' />
      ) : (
        <div className={`mines-${square.square}`}>{square.square !== 0 && square.square}</div>
      )}
    </div>
  );
};

export default SquareRevealed;
