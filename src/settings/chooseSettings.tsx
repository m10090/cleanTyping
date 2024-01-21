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
  const informationElement = (
    <div
      className="information"
      id={`information-${id}`}
      style={{
        top:
          document
            ?.getElementById(`btn-information-${id}`)
            ?.getBoundingClientRect().y -
          document.getElementById(`btn-information-${id}`)?.clientHeight -
          document.getElementById(`information-${id}`)?.clientHeight +
          "px",
        left:
          document
            ?.getElementById(`btn-information-${id}`)
            ?.getBoundingClientRect().right + "px",
      }}
    >
      {information}
    </div>
  );

  const [s, setS] = useState(false);
  return (
    <div id={id} className="options">
      <h3
        id={`btn-information-${id}`}
        className="btn-information"
        onMouseOver={() => {
          setS(true);
        }}
        onMouseLeave={() => {
          setS(false);
        }}
      >
        {text}
      </h3>
      {s && informationElement}
      <div className="selections">
        {options.map((option) => {
          return (
            <div key={option}>
              <button
                className={
                  localStorage.getItem(id) === option ? "selected" : ""
                }
                onClick={() => {
                  localStorage.setItem(id, option);
                  location.reload();
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
