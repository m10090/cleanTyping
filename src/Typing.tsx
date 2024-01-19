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
export default function Typing() {
  const [right, setRight] = useState<string[]>([]);
  const [text, setText] = useState<string[]>([]);
  const author = useRef<string>("");
  useEffect(onStart(setText, author), []);
  useEffect(cursorAnimation(right), [right, text]);
  useEffect(typingEvent(setRight, text,right), [text, right]);
  if (right.length === text.length && text.length) {
    return <Result author={author.current} result={getResult()} log = {getLog()} />;
  }

  return (
    <div id="typing">
      <div className="center-content">
        <h6 id="wpm">WPM: {getWPM() || 0}</h6>
      </div>
      <div id="text">
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
      </div>
      <span id="cursor">|</span>
    </div>
  );
}
function onStart(setText, author) {
  return () => {
    window.addEventListener("keydown", function (e) {
      if (e.key == "space" && e.target == document.body) {
        e.preventDefault();
      }
    });
    getText(setText, author);
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
function cursorAnimation(right) {
  return () => {
    const interval = setInterval(cursorMovement(right.length), 10);
    return () => {
      clearInterval(interval);
    };
  };
}
