import { useState, useEffect, useRef } from "react";
import "./App.css";
import TypingHander, { cursorMovement , getResult} from "./util/TypingHander";
import { getText } from "./util/requests";
import Result from "./result";
export default function Typing() {
  const [right, setRight] = useState<string[]>([]);
  const [text, setText] = useState<string[]>([]);
  const author = useRef<string>("");
  useEffect(() => {
    getText(setText, author);
    window.addEventListener("keydown", function (e) {
      if (e.key == 'space' && e.target == document.body) {
        e.preventDefault();
      }
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(cursorMovement(right.length), 10);
    return () => {
      clearInterval(interval);
    };
  }, [right, text]);
  useEffect(() => {
    const handler = TypingHander(setRight, text[right.length]);
    document.addEventListener("keydown", handler);
    document
      .getElementsByClassName("letter")
      [right.length - 1]?.scrollIntoView({ behavior: "smooth" });
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [text, right]);
  if ((right.length === text.length) && (text.length)) {
    return <Result author={author.current} wpm={getResult()}/>;
  }

  return (
    <div id="typing">
      <div id="text">
        {text.map((letter, index) => {
          return (
            <span key={index} className={`letter ${right[index] ?? ""}`}>
              {letter}
            </span>
          );
        })}
      </div>
      <span id="cursor">|</span>
    </div>
  );
}
