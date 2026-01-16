// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AuthContext from "../context/AuthContext";

const NAV_ITEMS = [
  { name: "Home", to: "/" },
  { name: "Articles", to: "/articles" },
  { name: "Tracker", to: "/tracker" },
  { name: "Doctor Chat", to: "/chat" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const username = user?.email?.split("@")[0];

  const linkClass =
    "block px-3 py-2 rounded-md text-sm font-medium transition hover:text-secondary";

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight hover:opacity-90"
          >
            Mamacare
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `${linkClass} ${
                    isActive ? "text-secondary font-semibold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {!isAuthenticated ? (
              <NavLink to="/auth" className={linkClass}>
                Account
              </NavLink>
            ) : (
              <>
                <span className="text-sm opacity-90">
                  Hi, {username}
                </span>
                <button
                  onClick={logout}
                  className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-primary transition hover:opacity-90"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white/10">
          <div className="space-y-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={linkClass}
              >
                {item.name}
              </NavLink>
            ))}

            {!isAuthenticated ? (
              <NavLink
                to="/auth"
                onClick={() => setIsOpen(false)}
                className={linkClass}
              >
                Account
              </NavLink>
            ) : (
              <>
                <p className="px-3 py-2 text-sm opacity-80">
                  Hi, {username}
                </p>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full rounded-md bg-white px-3 py-2 text-sm font-medium text-primary"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
