import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DAILY_TASKS = ["Take prenatal pills", "Drink 8 glasses of water", "15 minutes exercise"];
const COMMON_SYMPTOMS = ["Morning sickness", "Fatigue", "Swelling", "Back pain", "Mood swings", "Headaches", "Cravings"];
const DEFAULT_NUTRITION = ["Spinach", "Eggs", "Salmon", "Oats", "Fruits", "Nuts", "Dairy"];
const BIRTH_DATE = new Date("2025-01-01");

const calculateAgeInMonths = (recordDateStr) => {
  const recordDate = new Date(recordDateStr);
  let ageInMonths = (recordDate.getFullYear() - BIRTH_DATE.getFullYear()) * 12;
  ageInMonths += recordDate.getMonth() - BIRTH_DATE.getMonth();
  return Math.round(ageInMonths);
};

export default function BabyTracker() {
  const navigate = useNavigate();

  const [dailyTasks, setDailyTasks] = useState([]);
  const [taskDate, setTaskDate] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [nutritionList, setNutritionList] = useState([]);
  const [nutritionInput, setNutritionInput] = useState("");
  const [consumed, setConsumed] = useState({});
  const [weightRecords, setWeightRecords] = useState([]);
  const [weightInput, setWeightInput] = useState("");

  const [showConfetti, setShowConfetti] = useState(false);

 
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("dailyTaskDate");
    const savedTasks = JSON.parse(localStorage.getItem("dailyTasks")) || DAILY_TASKS.map(() => false);
    if (savedDate !== today) {
      setDailyTasks(DAILY_TASKS.map(() => false));
      setTaskDate(today);
      localStorage.setItem("dailyTaskDate", today);
      localStorage.setItem("dailyTasks", JSON.stringify(DAILY_TASKS.map(() => false)));
    } else {
      setDailyTasks(savedTasks);
      setTaskDate(today);
    }
  }, []);

  const toggleTask = (index) => {
    const updated = [...dailyTasks];
    updated[index] = !updated[index];
    setDailyTasks(updated);
    localStorage.setItem("dailyTasks", JSON.stringify(updated));
  };

  const dailyProgress = Math.round((dailyTasks.filter(Boolean).length / dailyTasks.length) * 100);

  useEffect(() => {
    if (dailyProgress === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [dailyProgress]);


  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const submitSymptoms = () => {
    if (selectedSymptoms.length === 0) return;
    navigate("/chat", { state: { prefilled: `My symptoms are: ${selectedSymptoms.join(", ")}` } });
  };


  useEffect(() => {
    const savedNutrition = JSON.parse(localStorage.getItem("nutritionList")) || DEFAULT_NUTRITION;
    setNutritionList(savedNutrition);
    const savedConsumed = JSON.parse(localStorage.getItem("consumed")) || {};
    setConsumed(savedConsumed);
  }, []);

  const addNutrition = () => {
    if (!nutritionInput.trim()) return;
    const updated = [...nutritionList, nutritionInput.trim()];
    setNutritionList(updated);
    localStorage.setItem("nutritionList", JSON.stringify(updated));
    setNutritionInput("");
  };

  const removeNutrition = (item) => {
    const updated = nutritionList.filter((i) => i !== item);
    setNutritionList(updated);
    localStorage.setItem("nutritionList", JSON.stringify(updated));
    const updatedConsumed = { ...consumed };
    delete updatedConsumed[item];
    setConsumed(updatedConsumed);
    localStorage.setItem("consumed", JSON.stringify(updatedConsumed));
  };

  const toggleConsumed = (item) => {
    const updated = { ...consumed, [item]: !consumed[item] };
    setConsumed(updated);
    localStorage.setItem("consumed", JSON.stringify(updated));
  };

  const nutritionProgress = Math.round(
    Object.values(consumed).filter(Boolean).length / nutritionList.length * 100
  );

  useEffect(() => {
    if (nutritionProgress === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [nutritionProgress]);

 
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("weightRecords")) || [];
    setWeightRecords(saved);
  }, []);

  const addWeightRecord = () => {
    if (!weightInput) return;
    const ageMonths = calculateAgeInMonths(new Date().toISOString());
    const newRecord = { id: Date.now(), ageMonths, weight: parseFloat(weightInput) };
    const updated = [...weightRecords, newRecord];
    setWeightRecords(updated);
    localStorage.setItem("weightRecords", JSON.stringify(updated));
    setWeightInput("");
  };

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto space-y-12 relative">

      {showConfetti && <Confetti numberOfPieces={150} recycle={false} gravity={0.3} />}

      {}
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-primary mb-4">Daily Reminders</h2>
        <ul className="space-y-2">
          {DAILY_TASKS.map((task, i) => (
            <li key={i} className="flex items-center gap-3">
              <input type="checkbox" checked={dailyTasks[i] || false} onChange={() => toggleTask(i)} className="w-5 h-5 accent-primary transition-transform duration-200 hover:scale-110" />
              <span className={`transition-all duration-300 ${dailyTasks[i] ? "line-through text-gray-400" : ""}`}>
                {task}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-4 bg-primary rounded-full transition-all duration-500 ease-in-out" style={{ width: `${dailyProgress}%` }}></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{dailyProgress}% completed</p>
      </div>

      {}
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-primary mb-4">Track Your Symptoms</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {COMMON_SYMPTOMS.map((symptom, i) => (
            <li key={i} onClick={() => toggleSymptom(symptom)} className={`cursor-pointer border p-2 rounded text-center transition-all duration-300 transform ${selectedSymptoms.includes(symptom) ? "bg-secondary text-white border-secondary scale-105 shadow" : "bg-gray-50 hover:bg-gray-100 hover:scale-105"}`}>
              {symptom}
            </li>
          ))}
        </ul>
        <button onClick={submitSymptoms} className="mt-4 bg-primary text-white py-2 px-6 rounded-lg hover:bg-secondary transition-transform transform hover:scale-105">
          Submit Symptoms
        </button>
      </div>

      {}
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-primary mb-4">Nutrition Tracker</h2>
        <div className="flex gap-2 mb-4">
          <input value={nutritionInput} onChange={(e) => setNutritionInput(e.target.value)} placeholder="Add food item" className="flex-grow border p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none transition" />
          <button onClick={addNutrition} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-transform transform hover:scale-105">
            Add
          </button>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {nutritionList.map((item, i) => (
            <li key={i} className="flex items-center gap-2 border p-2 rounded justify-between hover:shadow-sm transition-shadow">
              <span onClick={() => toggleConsumed(item)} className={`flex-1 cursor-pointer transition-all duration-300 ${consumed[item] ? "line-through text-gray-400" : ""}`}>
                {item}
              </span>
              <button onClick={() => removeNutrition(item)} className="text-red-500 font-bold hover:text-red-700 transition-colors">✕</button>
            </li>
          ))}
        </ul>
        <div className="mt-4 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-4 bg-primary rounded-full transition-all duration-500 ease-in-out" style={{ width: `${nutritionProgress || 0}%` }}></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{nutritionProgress || 0}% consumed</p>
      </div>

      {}
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-primary mb-4">Week-by-Week Weight</h2>
        <div className="flex gap-2 mb-4">
          <input type="number" value={weightInput} onChange={(e) => setWeightInput(e.target.value)} placeholder="Weight (kg)" className="flex-grow border p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none transition" />
          <button onClick={addWeightRecord} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-transform transform hover:scale-105">
            Add
          </button>
        </div>
        {weightRecords.length > 0 && (
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weightRecords} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageMonths" label={{ value: "Age (Months)", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Weight (kg)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Bar dataKey="weight" fill="#cdb4db" name="Weight" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
}
