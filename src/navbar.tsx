import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div id="Navbar">
      <div id="Navbar-Title">
        <div className="typingMotion">
          <Link to="/">Typing</Link>{" "}
        </div>
        <div className="typingMotion">
          <Link to="/settings">Settings</Link>
        </div>
        <div className="typingMotion">
          <Link to="/about">About</Link>
        </div>
        <div className="typingMotion">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
