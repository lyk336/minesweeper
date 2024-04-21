export function indexToCoordinates(width: number, index: number): [number, number] {
  const x: number = index % width;
  const y: number = Math.floor(index / width);
  return [x, y];
}
export function coordinatesToIndex(width: number, x: number, y: number): number {
  const index: number = y * width + x;
  return index;
}
