import { useState, useEffect, useRef } from "react";
import { ILogSection, IReplay } from "./util/interfaces";
import cookies from "js-cookie"
export default function Result({ author, result, log }) {
  const logRef = useRef(log);
  const timerOuts = useRef(null);
  const [replaySpeed, setReplaySpeed] = useState(1);
  const [replay, setReplay] = useState<IReplay[]>([]);
  useEffect(() => {
    if (cookies.get("loggedIn")) {
      fetch(import.meta.env.VITE_BACKEND_URI+"private/logSection", {
        method: "POST",
        body: JSON.stringify(log),
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    const logTop: ILogSection = logRef.current[0];
    if (logTop == undefined) return;
    logRef.current = logRef.current.slice(1);
    timerOuts.current = setTimeout(
      () => {
        if (logTop.written == "Backspace") {
          setReplay(replay.slice(0, logTop?.lastSpaceIndex ?? -1));
          return;
        }
        const right = logTop.written === logTop.current;
        setReplay((replay) => [
          ...replay,
          {
            written: logTop.written,
            right: right,
          },
        ]);
      },
      (logTop.time * 10) / replaySpeed,
    );
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
      <div>
        <button
          onClick={() => {
            setReplaySpeed(1);
            setReplay([]);
            logRef.current = log;
            clearTimeout(timerOuts.current);
          }}
        >
          1x
        </button>
        <button
          onClick={() => {
            setReplaySpeed(2);
            setReplay([]);
            logRef.current = log;
            clearTimeout(timerOuts.current);
          }}
        >
          2x
        </button>
        <button
          onClick={() => {
            setReplaySpeed(4);
            setReplay([]);
            logRef.current = log;
            clearTimeout(timerOuts.current);
          }}
        >
          4x
        </button>
        <button
          onClick={() => {
            setReplaySpeed(8);
            setReplay([]);
            logRef.current = log;
            clearTimeout(timerOuts.current);
          }}
        >
          8x
        </button>
      </div>
    </div>
  );
}
