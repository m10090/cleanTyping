import SelectOptions from "./chooseSettings";
import "./settings.css";
export default function Settings() {
  return (
    <div id="settings">
      <input type="search" />
      <ul>
        <li>
          <SelectOptions
            id="hardness"
            options={["easy", "medium", "hard"]}
            information="this is a test"
            text="Hardness"
          />
        </li>
        <li>
          <SelectOptions
            id="stop-on-error"
            options={["True", "False"]}
            information="this is a test"
            text="End on error"
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
            id="timer"
            options={["True", "False"]}
            information="this is a test
            please be bigger be bigger bigger"
            text="Timer"
          />
        </li>
        <li>
          <label id="max word number"> max word number</label>
          <input type="number" />
        </li>
        <li>
          <label id="min word length"> min word length</label>
          <input type="number" />
        </li>
      </ul>
    </div>
  );
}
