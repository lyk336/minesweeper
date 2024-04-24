export function formatTime(timeInSeconds: number): string {
  const minutes: number = Math.floor(timeInSeconds / 60);
  const seconds: number = timeInSeconds % 60;
  const secondsStr: string = seconds.toString().padStart(2, '0');
  return `${minutes}:${secondsStr}`;
}
