import React from "react";
import { useState } from "react";
import "../App.css";

const Header = ({ title, createdBy }) => (
  <header
    className="flex justify-between items-center p-6 bg-cyan-50 
    font-mono border rounded mr-2 ml-2 shadow-lg border-slate-700"
  >
    <div className="text-xl">🦋 {title} 🦋</div>
    <div>
      by{" "}
      <a href="https://github.com/shyynux" className="text-cyan-500">
        {" "}
        {createdBy}
      </a>
    </div>
  </header>
);

function Navbar() {
  const [loggedIn, setLoggedIn] = useState();
  return (
    <div>
      <Header title="Taskbar" createdBy="@shyynux" />
    </div>
  );
}

export default Navbar;
