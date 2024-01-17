import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="body-content">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
