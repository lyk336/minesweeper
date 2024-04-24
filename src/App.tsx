import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Field, FieldSizes, Square } from '../scripts/field';
import { GameResult } from '../scripts/gameResultEnum';
import './App.css';

// components
import Toolbar from './components/Toolbar';
import Board from './components/Board';
import EndScreen from './components/EndScreen';

const App: FC = () => {
  const [fieldSize, setFieldSize] = useState<FieldSizes>(FieldSizes.medium);
  const [fieldData, setFieldData] = useState<Field>(new Field(fieldSize, () => {}));
  const [field, setField] = useState<Array<Square>>(fieldData.field);
  const [mineMarks, setMineMarks] = useState<number>(fieldData.mineNumber);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const remainingSquaresMap = useRef<Map<number, Square>>(new Map());
  const startTime = useRef<number>(Date.now());

  const endGame = (result: GameResult) => {
    setIsGameStarted(false);
    setGameResult(result);
  };
  const newGame = useCallback((): void => {
    const fieldData = new Field(fieldSize, () => {
      endGame(GameResult.loss);
    });
    setFieldData(fieldData);
    setField(fieldData.field);
    setIsGameStarted(false);
    setGameResult(null);
    setMineMarks(fieldData.mineNumber);

    remainingSquaresMap.current = new Map(fieldData.field.map((square: Square) => [square.squareIndex, square]));
  }, [fieldSize]);

  useEffect(() => {
    newGame();
  }, [fieldSize, newGame]);

  // helper functions
  const updateUnrevealedCount = (squareIndex: number): void => {
    remainingSquaresMap.current.delete(squareIndex);
  };
  const revealSquare = (squareIndex: number): void => {
    const square: Square = fieldData.field[squareIndex];
    square.revealSquare(fieldData.field, updateUnrevealedCount);

    if (remainingSquaresMap.current.size === fieldData.mineNumber) {
      endGame(GameResult.win);
      setGameResult(GameResult.win);
    }
    setField([...fieldData.field]);
  };
  const startGame = (squareIndex: number): void => {
    setIsGameStarted(true);
    fieldData.createField(squareIndex);
    revealSquare(squareIndex);
    startTime.current = Date.now();
  };
  const markSquare = (square: Square): void => {
    if (!isGameStarted) return;

    square.mark();
    if (square.isMarked) setMineMarks((marks: number) => marks - 1);
    if (!square.isMarked) setMineMarks((marks: number) => marks + 1);
  };

  // handlers
  const handleSquareClick = (e: MouseEvent<HTMLDivElement>, square: Square, squareIndex: number): void => {
    // adding/removing mark
    if (e.altKey) {
      markSquare(square);
      return;
    }

    // revealing square
    if (!isGameStarted) {
      startGame(squareIndex);
    }
    revealSquare(squareIndex);
  };
  const handleChangeFieldSize = (fieldSize: FieldSizes): void => {
    setFieldSize(fieldSize);
  };
  const handleNewGame = (): void => {
    newGame();
  };

  return (
    <main>
      <Toolbar
        handleChangeFieldSize={handleChangeFieldSize}
        isGameStarted={isGameStarted}
        fieldData={fieldData}
        mineMarks={mineMarks}
      />
      <Board fieldSize={fieldSize} fieldWidth={fieldData.width} field={field} handleSquareClick={handleSquareClick} />
      {gameResult && <EndScreen gameResult={gameResult} handleNewGame={handleNewGame} startTime={startTime.current} />}
    </main>
  );
};

export default App;
