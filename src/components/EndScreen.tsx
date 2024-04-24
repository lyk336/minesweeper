import { FC } from 'react';
import { GameResult } from '../../scripts/gameResultEnum';
import { formatTime } from '../../scripts/formatTime';

interface IEndScreenProps {
  gameResult: GameResult;
  handleNewGame: () => void;
  startTime: number;
}

const EndScreen: FC<IEndScreenProps> = ({ gameResult, handleNewGame, startTime }) => {
  let title: string;
  switch (gameResult) {
    case GameResult.win:
      title = 'You win!';
      break;
    case GameResult.loss:
      title = 'You lose!';
      break;
  }

  const playTime = (): string => {
    const currentTime: number = Date.now();
    const playTime: number = currentTime - startTime;
    const playTimeInSeconds: number = Math.floor(playTime / 1000);

    return formatTime(playTimeInSeconds);
  };

  return (
    <div className='end-screen__overlay'>
      <section className={`end-screen ${gameResult}`}>
        <h2 className='end-screen__title'>{title}</h2>
        <div className='end-screen__time'>
          <h3>Play time:</h3>
          <span>{playTime()}</span>
        </div>
        <button className='end-screen__new-game' onClick={handleNewGame}>
          New game
        </button>
      </section>
    </div>
  );
};

export default EndScreen;
