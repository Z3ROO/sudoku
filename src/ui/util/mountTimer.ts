export function mountTimer(timer:number): string {
  timer = timer / 1000;
  const seconds = Math.floor(timer % 60).toString();
  const minutes = Math.floor(timer / 60).toString();
  
  return `${minutes.padStart(2,'0')}:${seconds.padStart(2,'0')}`
}