import { Link } from "react-router-dom";
import TypeIt from "typeit-react";
import { useAuth0 } from "@auth0/auth0-react";
export default function Navbar() {
  const { logout, loginWithPopup, isAuthenticated } = useAuth0();
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
            {!isAuthenticated && (
              <span
                onClick={() => {
                  loginWithPopup();
                }}
              >
                <a>Login</a>
              </span>
            )}
            {isAuthenticated && (
              <span
                onClick={() => {
                  logout();
                }}
              >
                <a>Logout</a>
              </span>
            )}
          </TypeIt>
        </div>
      </div>
    </div>
  );
}
