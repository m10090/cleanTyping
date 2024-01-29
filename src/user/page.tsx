import cookies from "js-cookie";
import { useEffect, useState } from "react";

const backendURI = import.meta.env.VITE_BACKEND_URI;

export default function LoginButton() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    if (!cookies.get("loggedIn")) return;
    fetch(backendURI + "private/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setName(res.name);
        setPhoto(res.photo)
      });
  }, []);
  if (cookies.get("loggedIn")) {
    return (
      <div className="center-content">
        <img
          src={photo}
          style={{
            borderRadius: "50%",
          }}
        />
        <h2>{name}</h2>
        <button
          onClick={() => {
            location.href = `${backendURI}private/logout`;
          }}
        >
          logout
        </button>
      </div>
    );
  }
  return (
    <div className="center-content">
      <button onClick={() => (location.href = `${backendURI}auth/google`)}>
        login with google
      </button>
    </div>
  );
}
