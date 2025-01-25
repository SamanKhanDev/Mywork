// src/components/Login.tsx
import React, { useState } from "react";
import { auth } from "../firebase"; // Firebase konfiguratsiyasi
import { signInWithEmailAndPassword } from "firebase/auth"; // Email/Parol bilan sign in qilish
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Agar login muvaffaqiyatli bo'lsa, Admin Panelga o'tish
      navigate("/admin");
    } catch (error: any) {
      // Xatolik yuzaga kelsa
      setError("Login yoki parol noto'g'ri.");
      navigate("/"); // Noto'g'ri kirganda Home sahifasiga o'tish
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all hover:scale-105 duration-300"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mt-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-4 rounded-xl text-xl hover:bg-indigo-700 focus:outline-none"
        >
          Login
        </button>
        
      </form>
    </div>
  );
};

export default Login;
