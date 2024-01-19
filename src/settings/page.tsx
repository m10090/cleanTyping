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
        <input
          type="search"
          id="settings-search"
          placeholder="Search..."
        />
      </div>
      <ul>
        <li>
          <SelectOptions
            id="difficulty"
            options={["Easy", "Medium", "Hard"]}
            information="this is a test"
            text="Difficulty"
          />
        </li>
        <li>
          <SelectOptions
            id="stop-on-error"
            options={["True", "False"]}
            information="this is a test"
            text="Stop On Error"
          />
        </li>
        <li>
          <SelectOptions
            id="blind-mode"
            options={["True", "False"]}
            information="this is a test"
            text="Blind Mode"
          />
        </li>
        <li>
          <SelectOptions
            id="no-delete"
            options={["True", "False"]}
            information="this is a test"
            text="No Delete"
          />
        </li>
        <li>
          <SelectOptions
            id="timer"
            options={["True", "False"]}
            information="this is a test
            please be bigger be bigger bigger"
            text="Timer"
          />
        </li>
      </ul>
    </div>
  );
}
