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
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // --- GOOGLE SIGN-IN ---
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    // 🔥 ADDED: Check if Vite is reading the .env correctly
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

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-white/30 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Password"
              required
            />
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
            {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
