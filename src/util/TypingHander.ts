export default function typingHander(setRight, expected: string) {
  if (expected == undefined) return function () {};
  return function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || e.key === "Shift") return;
    if (e.key == "Backspace") setRight((right: string[]) => right.slice(0, -1));
    else
      e.key === expected
        ? setRight((right: string[]) => [...right, "correct"])
        : setRight((right: string[]) => [...right, "incorrect"]);
  };
}
let cursorPos = 0;
export function cursorMovement(right: number) {
  return function () {
    const cursor = document.getElementById("cursor");
    const letterRect = document
      .getElementsByClassName("letter")
      [right]?.getBoundingClientRect();
    if (letterRect === undefined || cursor === undefined) {
      return;
    }
    cursorPos += Math.max((letterRect.left - cursorPos) / 10, 1);
    cursorPos = Math.min(cursorPos, letterRect.left - 5);
    cursor.style.left = cursorPos + "px";
    cursor.style.top = letterRect.top + 3 + "px";
  };
}
