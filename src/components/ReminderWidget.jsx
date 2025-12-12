import React, { useState, useEffect } from "react";

export default function ReminderWidget() {
  const [reminder, setReminder] = useState("");
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reminders")) || [];
    setReminders(saved);
  }, []);

  const addReminder = () => {
    if (!reminder.trim()) return;
    const updated = [...reminders, reminder.trim()];
    setReminders(updated);
    localStorage.setItem("reminders", JSON.stringify(updated));
    setReminder("");
  };

  const deleteReminder = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    setReminders(updated);
    localStorage.setItem("reminders", JSON.stringify(updated));
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-10 max-w-md mx-auto">
      <h3 className="text-2xl font-semibold text-primary mb-4">Daily Reminders</h3>
      <div className="flex gap-2">
        <input
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          placeholder="Add a reminder..."
          className="flex-grow border p-2 rounded"
        />
        <button
          onClick={addReminder}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          Add
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {reminders.map((r, i) => (
          <li key={i} className="flex justify-between bg-secondary/20 px-4 py-2 rounded">
            {r}
            <button onClick={() => deleteReminder(i)} className="text-red-500">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}



export function notify(title, body){
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(p => {
      if (p === "granted") new Notification(title, { body });
    });
  }
}
