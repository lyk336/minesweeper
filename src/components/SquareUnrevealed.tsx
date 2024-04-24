import { FC, MouseEvent } from 'react';

interface ISquareUnrevealedProps {
  color: string;
  handleSquareClick: (e: MouseEvent<HTMLDivElement>) => void;
  isMarked: boolean;
}

const SquareUnrevealed: FC<ISquareUnrevealedProps> = ({ color, handleSquareClick, isMarked }) => {
  return (
    <div className={`square square-${color}`} onClick={handleSquareClick}>
      {isMarked && <img src='src/assets/flag.webp' alt='' />}
    </div>
  );
};

export default SquareUnrevealed;
