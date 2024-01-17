import { useState, useEffect, useRef } from "react";
import "./App.css";
import { typingHander, cursorMovement, getResult } from "./util/TypingHander";
import { getText } from "./util/requests";
import Result from "./result";
export default function Typing() {
  const [right, setRight] = useState<string[]>([]);
  const [text, setText] = useState<string[]>([]);
  const author = useRef<string>("");
  const blindMode = useRef<boolean>(false);
  useEffect(() => {
    getText(setText, author);
    window.addEventListener("keydown", function (e) {
      if (e.key == "space" && e.target == document.body) {
        e.preventDefault();
      }
    });
    blindMode.current = localStorage.getItem("blind-mode") === "True";
  }, []);
  useEffect(() => {
    const interval = setInterval(cursorMovement(right.length), 10);
    return () => {
      clearInterval(interval);
    };
  }, [right, text]);
  useEffect(() => {
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
  }, [text, right]);
  if (right.length === text.length && text.length) {
    return <Result author={author.current} wpm={getResult()} />;
  }

  return (
    <div id="typing">
      <div id="text">
        {text.map((letter, index) => {
          if (!blindMode.current)
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
