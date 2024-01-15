import Cookies from "cookie";
export default function Settings() {
  const values = Cookies.parse(document.cookie);
  return (
    <div id="settings">
      <input type="search" />
      <ul>
        <li>
          <label htmlFor="hard Mode">hard Mode</label>
          <select name="hard Mode" id="hard Mode">
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label htmlFor="stop on error">stop on error</label>
          <select name="stop on error" id="stop on error">
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label htmlFor="blind mode">blind mode</label>
          <button
            className={
              values['blindMode'] === "true" ? "selected" : ""
            }
            onClick={() => {
              document.cookie = "blindMode=true;max-age=31536000";
              window.location.reload();
            }}
          >
            true
          </button>
          <button
            className={
              values['blindMode'] === "false" ? "selected" : ""
            }
            onClick={() => {
              document.cookie = "blindMode=false;max-age=31536000";
              window.location.reload();
            }}
          >
            false
          </button>
        </li>
      </ul>
    </div>
  );
}
