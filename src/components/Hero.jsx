import React from "react";
import heroImg from "../assets/pregnant-woman.jpg";

export default function Hero() {
  return (
    <section className="text-center py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <img
          src={heroImg}
          alt="Pregnant woman"
          className="rounded-2xl shadow-md mx-auto mb-8 w-full max-w-md object-cover"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Welcome to Mamacare
        </h1>
        <p className="text-lg text-muted mt-4">
          Your smart companion for pregnancy, motherhood, and baby care.
        </p>
      </div>
    </section>
  );
}


import { motion } from "framer-motion";

<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="px-6 py-3 rounded-xl bg-primary text-white"
>
  Get Started
</motion.button>
