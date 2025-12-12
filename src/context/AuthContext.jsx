// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AUTH_KEY = "mamacare_auth_token";
const USER_KEY = "mamacare_user";

const API_URL = import.meta.env.VITE_API_URL || "https://mamacare-backend-901q.onrender.com/";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem(AUTH_KEY);
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.valid) {
          const local = JSON.parse(localStorage.getItem(USER_KEY) || "null");
          setUser(local || { id: data.userId, email: null });
        } else {
          localStorage.removeItem(AUTH_KEY);
          localStorage.removeItem(USER_KEY);
          setUser(null);
        }
      } catch (err) {
        console.error("Token verify failed", err);
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  // Helper to store token & user
  const _saveAuth = (token, userObj) => {
    if (token) localStorage.setItem(AUTH_KEY, token);
    if (userObj) localStorage.setItem(USER_KEY, JSON.stringify(userObj));
    setUser(userObj || null);
  };

  // SIGNUP: will call backend register then automatically login
  const signup = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { ok: false, message: data.message || "Registration failed" };
      }

      // After register, log the user in to get token
      const loginRes = await login({ email, password });
      if (!loginRes.ok) return { ok: false, message: loginRes.message };

      return { ok: true };
    } catch (err) {
      console.error("Signup error", err);
      return { ok: false, message: "Signup failed. Check your network." };
    }
  };

  // LOGIN (email/password)
  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { ok: false, message: data.message || "Invalid credentials" };
      }

      const token = data.token;
      const userObj = { id: data.userId || null, email };

      _saveAuth(token, userObj);
      return { ok: true };
    } catch (err) {
      console.error("Login error", err);
      return { ok: false, message: "Login failed. Check your network." };
    }
  };

  // GOOGLE SIGN IN
  const googleSignIn = async (idToken) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { ok: false, message: data.message || "Google sign-in failed" };
      }

      // Save token and user
      const token = data.token;
      const userObj = { id: data.userId, email: data.email, name: data.name, avatar: data.avatar };
      _saveAuth(token, userObj);

      return { ok: true };
    } catch (err) {
      console.error("Google sign-in error", err);
      return { ok: false, message: "Network error during Google sign-in" };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signup,
        login,
        googleSignIn,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
