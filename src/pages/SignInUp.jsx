// src/pages/SignInUp.jsx
import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function SignInUp() {
  const { signup, login, googleSignIn } = useContext(AuthContext);
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ NEW
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // --- GOOGLE SIGN-IN ---
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    console.log("Loaded Google Client ID:", clientId);

    if (!clientId) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not set in .env");
      return;
    }

    const initGoogle = () => {
      if (!window.google || !document.getElementById("googleSignInDiv")) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    };

    if (window.google) initGoogle();
    else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          initGoogle();
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const idToken = response?.credential;
    if (!idToken) {
      setError("Google sign-in failed to return credential.");
      console.error("Google credential missing:", response);
      return;
    }

    setError("");
    try {
      const result = await googleSignIn(idToken);
      if (!result.ok) {
        setError(result.message || "Google sign-in failed");
        return;
      }
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Google sign-in failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (isSignIn) {
      const res = await login({ email, password });
      if (!res.ok) {
        setError(res.message);
        return;
      }
      navigate(from, { replace: true });
    } else {
      if (!confirmPassword) {
        setError("Please confirm your password.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      const res = await signup({ email, password });
      if (!res.ok) {
        setError(res.message);
        return;
      }
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#cdb4db] via-[#ffafcc] to-[#a2d2ff] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 text-white"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-white/30 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* PASSWORD WITH EYE ICON */}
          <div>
            <label className="block mb-1 font-medium">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-12 rounded-lg border border-white/30 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye OFF
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.014.152-1.992.435-2.91M6.1 6.1A9.955 9.955 0 0112 5c5.523 0 10 4.477 10 10a9.96 9.96 0 01-1.67 5.55M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <line
                      x1="3"
                      y1="3"
                      x2="21"
                      y2="21"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </svg>
                ) : (
                  // Eye ON
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {!isSignIn && (
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-white/30 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Confirm Password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition font-semibold text-white"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-white/30" />
          <span className="px-3 text-white/70 text-sm">OR</span>
          <hr className="flex-grow border-white/30" />
        </div>

        <div id="googleSignInDiv" className="flex justify-center"></div>

        <p className="mt-6 text-center text-sm">
          <button
            onClick={() => {
              setIsSignIn(!isSignIn);
              setError("");
              setConfirmPassword("");
            }}
            className="text-white/90 hover:text-white font-medium"
          >
            {isSignIn
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
