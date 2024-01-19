export interface ILogSection {
  current: string;
  written: string;
  time: number;
  delete?: number; // when ctrl + backspace is pressed get the number that was deleted
}
