import Cookies from "js-cookie";
import { useState } from "react";
export default function SelectOptions({
  id,
  options,
  text,
  information,
}: {
  id: string;
  options: string[];
  text: string;
  information: string;
}) {
  const [s, setS] = useState(false);
  return (
    <div id={id} className="options">
      <h3>{text}</h3>
      <div
        id={`bt-information-${id}`}
        onMouseOver={() => {
          setS(true);
        }}
        onMouseLeave={() => {
          setS(false);
        }}
      >
        i
      </div>
      {s && (
        <div
          id={`information-${id}`}
          style={{
            position: "fixed",
            bottom:
              document
                .getElementById(`bt-information-${id}`)
                .getBoundingClientRect().bottom +
              // document.getElementById(`bt-information-${id}`).clientHeight +
              "px",
            left:
              document
                .getElementById(`bt-information-${id}`)
                .getBoundingClientRect().left + "px",
            translate: "-50%"
          }}
        >
          {information}
        </div>
      )}
      <div className="selections">
        {options.map((option) => {
          return (
            <div key={option}>
              <button
                className={Cookies.get(id) === option ? "selected" : ""}
                onClick={() => {
                  Cookies.set(id, option, { expires: 365 });
                  window.location.reload();
                }}
              >
                {option}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
