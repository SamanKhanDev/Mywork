// src/components/Register.tsx
import React, { useState } from "react";
import { auth } from  "../firebase" ; 
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 bg-white rounded shadow-md">
      <div>
        <h1>Register</h1>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
