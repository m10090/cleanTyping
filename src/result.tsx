import { useState, useEffect , useRef} from "react";
import { ILogSection } from "./util/interfaces";
export default function Result({ author, result, log }) {
  const logRef = useRef(log);
  useEffect(() => {
    // document.addEventListener("keydown", () => location.reload());
  }, []);
  const [replay, setReplay] = useState("");
  useEffect(() => {
    const logTop: ILogSection = logRef.current[0];
    if (logTop == undefined) return;
    logRef.current = logRef.current.slice(1);
    console.log(logRef.current);
    setTimeout(() => {
      if (logTop.written == "Backspace") {
        setReplay(replay.slice(0, logTop?.delete ?? -1));
        return;
      }
      setReplay((replay) => replay + logTop.written);
    }, logTop.time*10);
  }, [replay]);
  return (
    <div>
      <h2>{result}</h2>
      <h3> author : {author} </h3>
      <button onClick={() => location.reload()}>Try Again</button>
      <p id="replay">{replay}</p>
    </div>
  );
}
