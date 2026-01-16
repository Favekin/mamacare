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

  const navLinkBase =
    "relative px-4 py-2 text-base font-medium transition-all duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight hover:opacity-90"
          >
            Mamacare
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "text-secondary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-secondary"
                      : "hover:text-secondary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {!isAuthenticated ? (
              <NavLink
                to="/auth"
                className="rounded-lg border border-white/30 px-5 py-2 text-base font-semibold transition hover:bg-white hover:text-primary"
              >
                Account
              </NavLink>
            ) : (
              <>
                <span className="text-base opacity-90">
                  Welcome, <span className="font-semibold">{username}</span>
                </span>
                <button
                  onClick={logout}
                  className="rounded-lg bg-white px-5 py-2 text-base font-semibold text-primary transition hover:opacity-90"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden rounded-md p-2 hover:bg-white/10"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white/10">
          <div className="space-y-3 px-6 py-5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium transition hover:text-secondary"
              >
                {item.name}
              </NavLink>
            ))}

            {!isAuthenticated ? (
              <NavLink
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg border border-white/30 px-4 py-3 text-center text-lg font-semibold"
              >
                Account
              </NavLink>
            ) : (
              <>
                <p className="text-base opacity-80">
                  Signed in as <span className="font-semibold">{username}</span>
                </p>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full rounded-lg bg-white px-4 py-3 text-lg font-semibold text-primary"
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
