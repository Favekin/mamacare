// src/pages/DoctorChat.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const initialMessage = {
  text: "Hello! I'm Mamacare's Virtual Doctor Assistant. How can I help you with your pregnancy or motherhood questions today?",
  sender: 'ai',
};

const API_URL = import.meta.env.VITE_API_URL || "https://mamacare-backend-901q.onrender.com";
const TOKEN_KEY = "mamacare_auth_token";

export default function DoctorChat() {
  const { isAuthenticated } = useContext(AuthContext);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send user message -> backend -> OpenAI
  const sendMessageToAI = async (text) => {
    const token = localStorage.getItem(TOKEN_KEY);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const errMsg = err?.error || "AI service failed";
        setMessages((prev) => [...prev, { text: errMsg, sender: 'ai' }]);
        return;
      }

      const data = await res.json();
      const aiReply = data.reply || "Sorry — I couldn't get a response from the assistant.";
      setMessages((prev) => [...prev, { text: aiReply, sender: 'ai' }]);
    } catch (err) {
      console.error("AI request error:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Network error contacting AI. Please try again.", sender: 'ai' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (input.trim() === '') return;

    const userMessage = input.trim();
    // 1. Add user's message to the chat
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    // 2. Clear input field
    setInput('');
    // 3. Send to AI
    await sendMessageToAI(userMessage);
  };

  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-3 rounded-xl shadow
          ${message.sender === 'user'
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`
        }
      >
        {message.text}
      </div>
    </div>
  );

  // If user is not authenticated, show a small message (ProtectedRoute should redirect,
  // but this is an extra safeguard).
  if (!isAuthenticated) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Please sign in to use the Doctor Chat.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[85vh] py-8 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">Ask the Doctor</h2>

      <div className="flex-grow overflow-y-auto p-4 border border-gray-200 rounded-xl bg-white shadow-inner mb-4 space-y-2">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
          className="flex-grow border border-gray-300 p-3 rounded-lg focus:ring-secondary focus:border-secondary transition"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-secondary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary transition duration-300"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      <p className="text-xs text-center text-gray-500 mt-3">
        *Disclaimer: This is a virtual assistant. Always consult your primary healthcare provider for medical advice.
      </p>
    </div>
  );
}
