export interface ILogSection {
  current: string;
  written: string;
  time: number;
  lastSpaceIndex?: number; // when ctrl + backspace is pressed get the number that was deleted
}
export interface IReplay {
  written: string;
  right: boolean;
}
