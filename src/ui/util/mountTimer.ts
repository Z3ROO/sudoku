export function mountTimer(timer:number): string {
  const seconds = Math.floor(timer % 60).toString();
  const minutes = Math.floor(timer / 60).toString();
  
  return `${minutes.padStart(2,'0')}:${seconds.padStart(2,'0')}`
}