import { useEffect, useState } from "react";

const backendURI = import.meta.env.VITE_BACKEND_URI;

export default function LoginButton() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) return;
    fetch(backendURI + "private/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setName(res.name);
        setPhoto(res.photo)
      });
  }, []);
  if (localStorage.getItem("loggedIn")) {
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
      <h1>
        this is not a real app, it's just a demo to show how to use google
        it is not secure
      </h1>
    </div>
  );
}
