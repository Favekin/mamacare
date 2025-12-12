import React from "react";
import { Link } from "react-router-dom"; 
const features = [
  {
    title: "Pregnancy Tracker",
    desc: "Monitor your baby's growth and receive weekly insights.",
   
    path: "/tracker", 
  },
  {
    title: "Motherhood Tips",
    desc: "Personalized advice for new moms and caregivers.",
  
    path: "/chat",
  },
  {
    title: "Nutrition & Wellness",
    desc: "Healthy recipes and reminders tailored for you.",
    
    path: "/articles",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-6 bg-secondary/10">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">What Mamacare Offers</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
         
          <Link 
            key={i} 
            to={f.path} 
            className="block h-full"
          >
            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer h-full">
              <h3 className="text-xl font-semibold text-secondary mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}