import { useState, useEffect, useRef } from "react";
import "./App.css";
import TypingHander, { cursorMovement } from "./util/TypingHander";
export default function Typing() {
  const [right, setRight] = useState<string[]>([]);
  const [text, setText] = useState<string[]>([]);
  const author = useRef<string>("");
  useEffect(() => {
    const q = async () => {
      const response = await fetch(
        `https://api.quotable.io/random?minLength=${300}&maxLength=${1000}`,
      );
      const data = await response.json();
      author.current = data.author;
      const k = data.content.split("");
      setText(k);
    };
    q();
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
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [text, right]);
  return (
    <div id="typing">
      <div id="author">{author.current}</div>
      <div id="text">
        {text.map((letter, index) => {
          return (
            <span key={index} className={`letter ${right[index] ?? ""}`}>
              {letter}
            </span>
          );
        })}
        <span id="cursor">|</span>
      </div>
      {document
        .getElementsByClassName("letter")
        [right.length - 1]?.scrollIntoView({ behavior: "smooth" })}
    </div>
  );
}
