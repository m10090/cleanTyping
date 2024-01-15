import Cookies from "js-cookie";
export default function SelectOptions({
  id,
  options,
}: {
  id: string;
  options: string[];
}) {
  return (
    <div id={id} className="options">
      <h3>{id}</h3>
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
