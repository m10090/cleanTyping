import { Link } from "react-router-dom";
import TypeIt from "typeit-react";
export default function Navbar() {
  return (
    <div id="Navbar">
      <div id="Navbar-Title">
        <div className="typingMotion">
          <TypeIt options={{ speed: 10 }}>
            <Link to="/">Typing</Link>{" "}
          </TypeIt>
        </div>
        <div className="typingMotion">
          <TypeIt options={{ speed: 10 }}>
            <Link to="/settings">Settings</Link>
          </TypeIt>
        </div>
        <div className="typingMotion">
          <TypeIt options={{ speed: 10 }}>
          <Link to="/about">About</Link>
          </TypeIt>
        </div>
        <div className="typingMotion">
          <TypeIt options={{ speed: 10 }}>
          <Link to="/login">Login</Link>
          </TypeIt>
        </div>
      </div>
    </div>
  );
}
