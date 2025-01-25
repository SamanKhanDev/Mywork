// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Admin";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import AboutMe from "./components/AboutMe";
import AdminPanel from "./components/AdminPanel";
import Works from "./components/Works";
import PostPage from "./components/PostPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar */}
        <header>
          <Navbar />
        </header>

        {/* Router bilan boshqariladigan asosiy kontent */}
        <main className="container"  
        style={{
          width: "1490px",
        margin: "auto",
      }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/register" element={<Register />} />
            <Route path="/works" element={<Works />} />
            <Route path="/admin" element={<AdminPanel />} /> {/* AdminPanel yo'nalishini qo'shing */}   
            <Route path="/post/:id" element={<PostPage />} /> {/* Dinamik post sahifasi */}
          </Routes>
        </main>
        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
};

export default App;