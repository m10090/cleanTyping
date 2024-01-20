import { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  typingHander,
  cursorMovement,
  getResult,
  getWPM,
  getLog,
} from "./util/TypingHander";
import { getText } from "./util/requests";
import Result from "./result";
const blindMode = localStorage.getItem("blind-mode") === "True";
const IsTimer = localStorage.getItem("timer") === "True";
export default function Typing() {
  const [right, setRight] = useState<string[]>([]);
  const [text, setText] = useState<string[]>([]);
  const [timerValue, setTimerValue] = useState(60);
  const author = useRef<string>("");
  useEffect(onStart(setText, author), []);
  useEffect(cursorAnimation(right), [right, text]);
  useEffect(typingEvent(setRight, text, right), [text, right]);
  useEffect(timer(setTimerValue), []);
  if ((right.length === text.length && text.length) || timerValue <= 0) {
    return (
      <Result author={author.current} result={getResult()} log={getLog()} />
    );
  }

  return (
    <div id="typing">
      <div className="Dashboard">
        <h6 id="wpm">WPM: {getWPM() || 0}</h6>
        {IsTimer && <h6 id="timer">Time lift: {timerValue}</h6> }
      </div>
      <p id="text">
        {text.map((letter, index) => {
          if (!blindMode)
            return (
              <span key={index} className={`letter ${right[index] ?? ""}`}>
                {letter}
              </span>
            );
          return (
            <span key={index} className={`letter`}>
              {letter}
            </span>
          );
        })}
      </p>
      <span id="cursor">|</span>
    </div>
  );
}
function onStart(setText, author) {
  return () => {
    window.addEventListener("keydown", function (e) {
      if (e.key == "space" && e.target == document.body) {
        e.preventDefault(); // prevent the space to scroll down the page
      }
    });
    getText(setText, author); // get the text from the api
  };
}
function typingEvent(setRight, text, right) {
  return () => {
    const handler = typingHander(
      setRight,
      text[right.length],
      right.length - text.slice(0, right.length).lastIndexOf(" "),
    );
    document.addEventListener("keydown", handler);
    document
      .getElementsByClassName("letter")
      [right.length - 1]?.scrollIntoView({ behavior: "smooth" });
    return () => {
      document.removeEventListener("keydown", handler);
    };
  };
}
function cursorAnimation(right: string[]) {
  return () => {
    const interval = setInterval(cursorMovement(right.length), 10);
    return () => {
      clearInterval(interval);
    };
  };
}

function timer(setTimerValue: React.Dispatch<React.SetStateAction<number>>) {
  if (!IsTimer) return () => {};
  return () => {
    setInterval(
      () => setTimerValue((timerValue: number) => timerValue - 1),
      1000,
    );
  };
}
