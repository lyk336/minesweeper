import { FC, useCallback, useEffect, useRef, useState } from 'react';
// import useStopwatch, { IStopwatch } from '../../scripts/hooks/useStopwatch';
import { formatTime } from '../../scripts/formatTime';
import { Field } from '../../scripts/field';

interface IStopwatchProps {
  isGameStarted: boolean;
  fieldData: Field;
}

const Stopwatch: FC<IStopwatchProps> = ({ isGameStarted, fieldData }) => {
  const [time, setTime] = useState<number>(0);
  const intervalId = useRef<number>(0);

  const startStopwatch = useCallback((): void => {
    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      setTime((time: number): number => time + 1);
    }, 1000);
  }, []);
  const stopStopwatch = useCallback((): void => {
    clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    if (isGameStarted) startStopwatch();
    if (!isGameStarted) stopStopwatch();
  }, [isGameStarted, startStopwatch, stopStopwatch]);

  useEffect(() => {
    setTime(0);
  }, [fieldData]);

  return (
    <div className='stopwatch'>
      <span>{formatTime(time)}</span>
    </div>
  );
};

export default Stopwatch;
