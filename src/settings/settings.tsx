import SelectOptions from "./select";
import "./settings.css";
export default function Settings() {
  return (
    <div id="settings">
      <input type="search" />
      <ul>
        <li>
          <SelectOptions id="hardness" options={["easy", "medium", "hard"]} />
        </li>
        <li>
          <SelectOptions id="stop on error" options={["True", "False"]} />
        </li>
        <li>
          <SelectOptions id="blind mode" options={["True", "False"]} />
        </li>
        <li>
          <SelectOptions id="show timer" options={["True", "False"]} />
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
