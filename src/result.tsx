import { useState, useEffect, useRef } from "react";
import { ILogSection, IReplay } from "./util/interfaces";
export default function Result({ author, result, log }) {
  const logRef = useRef(log);
  useEffect(() => {
    // document.addEventListener("keydown", () => location.reload());
  }, []);
  const [replay, setReplay] = useState<IReplay[]>([]);
  useEffect(() => {
    const logTop: ILogSection = logRef.current[0];
    if (logTop == undefined) return;
    logRef.current = logRef.current.slice(1);
    console.log(logRef.current);
    setTimeout(() => {
      if (logTop.written == "Backspace") {
        setReplay(replay.slice(0, logTop?.lastSpaceIndex ?? -1));
        return;
      }
      setReplay((replay) => [
        ...replay,
        {
          written: logTop.written,
          right: logTop.written === logTop.current,
        },
      ]);
    }, logTop.time * 10);
  }, [replay]);
  return (
    <div className="center-content">
      <h2>{result}</h2>
      <h3> author : {author} </h3>
      <button onClick={() => location.reload()}>Try Again</button>
      <p id="replay">
        {replay.map((char, index) => {
          return (
            <span
              key={index}
              className={`letter ${char.right ? "correct" : "incorrect"}`}
            >
              {char.written}
            </span>
          );
        })}
      </p>
    </div>
  );
}
