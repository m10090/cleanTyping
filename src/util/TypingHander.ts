import { ILogSection } from "./interfaces";

// variables for the hole file
const log: ILogSection[] = [];
let time = 0; // implementing my own timer as performance.now() is not supported only on windows
const noDelete: boolean = localStorage.getItem("no-delete") === "True";
const stopOnError: boolean = localStorage.getItem("stop-on-error") === "True";
// end
// run with the start of the file
setInterval(() => {
  time++;
}, 10); // implement my own timer as performance.now() is not supported only on windows
// end
// no export files
let start = false
function getTime(): number {
  const temp = time;
  time = 0;
  if (!start) return (start = true,0);
  return temp;
}
function getAccuracy(): number {
  const stack = [];
  log.forEach((section) => {
    if (section.written === "Backspace") {
      let temp = section?.lastSpaceIndex ?? 1;
      while (temp--) stack.pop();
      stack.pop();
      return;
    }
    stack.push(section.written === section.current);
  });
  return Math.round((100 * stack.filter((x) => x).length) / stack.length) ?? 0;
}
// end

export function typingHander(
  setRight: React.Dispatch<React.SetStateAction<string[]>>,
  expected: string,
  lastSpaceIndex: number,
) {
  return function (e: KeyboardEvent) {
    if ((e.ctrlKey || e.altKey) && e.key == "Backspace") {
      if (noDelete) return;
      if (lastSpaceIndex > 0)
        setRight((right: string[]) => right.slice(0, -lastSpaceIndex));
      else if (lastSpaceIndex == 0)
        setRight((right: string[]) => right.slice(0, -1));
      log.push({
        lastSpaceIndex: lastSpaceIndex,
        current: expected,
        written: e.key,
        time: getTime(),
      });
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey || e.key === "Shift") return;
    log.push({
      current: expected,
      written: e.key,
      time: getTime(),
    });
    if (e.key == "Backspace") {
      if (noDelete) return;
      setRight((right: string[]) => right.slice(0, -1));
    } else if (e.key === expected)
      setRight((right: string[]) => [...right, "correct"]);
    else if (stopOnError) return;
    else setRight((right: string[]) => [...right, "incorrect"]);
  };
}

export function getWPM() {
  const stack = [];
  let timeTaken = 0;
  log.forEach((section) => {
    timeTaken += section.time;
    if (section.written === "Backspace" && section?.lastSpaceIndex) {
      let temp = section?.lastSpaceIndex;
      while (temp--) stack.pop();
      return;
    }
    if (section.written === "Backspace") {
      stack.pop();
      return;
    }
    stack.push(section.written === section.current);
  });
  return (
    Math.round(
      stack.filter((x) => x).length / // number of correct char
        5 /
        (timeTaken / 6000),
    ) ?? 0
  );
}

let cursorPos = 0; // the position of the cursor
export function cursorMovement(right: number) {
  return function () {
    const cursor = document.getElementById("cursor");
    const letter = document.getElementsByClassName("letter");
    const letterRect = letter[right]?.getBoundingClientRect();
    if (letterRect === undefined || cursor === undefined) {
      return;
    }
    cursorPos += Math.max((letterRect.left - cursorPos) / 10, 1);
    cursorPos = Math.min(cursorPos, letterRect.left - 5);
    cursor.style.left = cursorPos + "px";
    cursor.style.top = letterRect.top + "px";
  };
}

function getRealAccuracy() {
  const stack = [];
  log.forEach((section) => {
    if (section.written === "Backspace") {
      return;
    }
    stack.push(section.written === section.current);
  });
  return Math.round((100 * stack.filter((x) => x).length) / stack.length) ?? 0;
}
export function getResult() {
  return getWPM() + " WPM" + " with Accuracy " + getAccuracy() + "% real accuracy " + getRealAccuracy() + "%";
}
export function getLog() {
  const res = [...log];
  return res;
}
