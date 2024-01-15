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
        `https://api.quotable.io/random?minLength=${500}&maxLength=${1000}`,
      );
      if (response.status === 404) {
        alert("lower the min length or raise the max length");
        window.location.href = "/settings";
        return;
      }

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
  useEffect(() => {
    document
      .getElementsByClassName("letter")
      [right.length - 1]?.scrollIntoView({ behavior: "smooth" });
  }, [right, text]);

  return (
    <div id="typing">
      <div id="text">
        {
          undefined || text.map((letter, index) => {
            return (
              <span key={index} className={`letter ${right[index] ?? ""}`}>
                {letter}
              </span>
            );
          })
        }
      </div>
      <span id="cursor">|</span>
    </div>
  );
}
