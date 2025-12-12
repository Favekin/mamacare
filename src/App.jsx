import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import BabyTracker from "./pages/BabyTracker";
import DoctorChat from "./pages/DoctorChat";
import SignInUp from "./pages/SignInUp";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Always show Navbar */}
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.33 }}
          className="flex-grow"
        >
          <Routes>

            {/* PUBLIC LANDING PAGE */}
            <Route path="/" element={<Home />} />

            {/* PUBLIC AUTH PAGE */}
            <Route path="/auth" element={<SignInUp />} />

            {/* PROTECTED ROUTES */}
            <Route
              path="/articles"
              element={
                <ProtectedRoute>
                  <Articles />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tracker"
              element={
                <ProtectedRoute>
                  <BabyTracker />
                </ProtectedRoute>
              }
            />

            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <DoctorChat />
                </ProtectedRoute>
              }
            />

          </Routes>
        </motion.main>
      </AnimatePresence>

      {/* Always show Footer */}
      <Footer />
    </div>
  );
}
