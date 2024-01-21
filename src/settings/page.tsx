import SelectOptions from "./chooseSettings";
import "./settings.css";
import { useEffect } from "react";
export default function Settings() {
  useEffect(() => {
    document
      .getElementById("settings-search")
      .addEventListener("input", function () {
        const input = this as HTMLInputElement;
        const lis = document.querySelectorAll(
          "#settings ul li",
        ) as NodeListOf<HTMLLIElement>;
        lis.forEach((li) => {
          const text = li.textContent?.toLowerCase() ?? "";
          if (text.includes(input.value.toLowerCase())) {
            li.style.display = "list-item";
          } else {
            li.style.display = "none";
          }
        });
      });
  }, []);
  return (
    <div id="settings">
      <div className="center-content">
        <input type="search" id="settings-search" placeholder="Search..." />
      </div>
      <ul>
        <li>
          <SelectOptions
            id="difficulty"
            options={["Easy", "Medium", "Hard"]}
            information="Set the number of words"
            text="Difficulty"
          />
        </li>
        <li>
          <SelectOptions
            id="stop-on-error"
            options={["True", "False"]}
            information="Stop typing when you make a mistake"
            text="Stop On Error"
          />
        </li>
        <li>
          <SelectOptions
            id="blind-mode"
            options={["True", "False"]}
            information="Don't know if you are typing the right letter"
            text="Blind Mode"
          />
        </li>
        <li>
          <SelectOptions
            id="no-delete"
            options={["True", "False"]}
            information="Backspace doesn't work"
            text="No Delete"
          />
        </li>
        <li>
          <SelectOptions
            id="timer"
            options={["True", "False"]}
            information="Type with a timer"
            text="Timer"
          />
        </li>
      </ul>
    </div>
  );
}
