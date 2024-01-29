import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app.tsx";
import { BrowserRouter } from "react-router-dom";
import qs from "qs";

const obj= qs.parse(window.location.search, { ignoreQueryPrefix: true })
Object.keys(
obj
).forEach((key) => {
  localStorage.setItem(key, obj[key]);
});
if (obj.loggedIn) window.location.href = window.location.pathname

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
