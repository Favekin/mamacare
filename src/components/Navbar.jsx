// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Articles", to: "/articles" },
    { name: "Tracker", to: "/tracker" },
    { name: "Doctor Chat", to: "/chat" },
  ];

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Mamacare</Link>
        <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>

        <ul className={`md:flex gap-6 ${open ? "block mt-4" : "hidden md:flex"}`}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.to} className="hover:text-secondary">
                {item.name}
              </Link>
            </li>
          ))}

          {!isAuthenticated ? (
            <li>
              <Link to="/auth" className="hover:text-secondary">Account</Link>
            </li>
          ) : (
            <>
              <li className="flex items-center gap-2 px-3 py-1">
                Hi, {user?.email?.split("@")[0]}
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-white text-primary px-3 py-1 rounded hover:opacity-90"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
