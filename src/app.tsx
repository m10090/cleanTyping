import { Routes, Route } from "react-router-dom";
import Typing from "./Typing";
import Navbar from "./navbar";
import Setting from "./settings/page.tsx";
import About from "./about/page.tsx";
import User from "./user/page.tsx";
export default function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Typing />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </>
  );
}
