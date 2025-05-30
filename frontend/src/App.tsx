
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import Inicio from "@/pages/Inicio";
import Perfil from "@/pages/Perfil";
import './App.css';
import { useEffect, useState } from "react";
import { TestConection } from "@/components/test"; 

import './App.css';
// Componente de layout condicional
function Layout() {
  const location = useLocation();
  const isLogin = location.pathname === "/";

  return (
    <div className={isLogin ? "flex min-h-svh items-center justify-center p-6 md:p-10" : "min-h-screen"}>
      <Routes>
        <Route path="/" element={<div className="w-full max-w-sm"><LoginForm /></div>} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/frontend/src/pages/Perfil.tsx" element={<Perfil />} />
      </Routes>
    </div>
  );
}





function App() {
  return (
    <Router>

      <Layout />

      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/TestConection" element={<TestConection />} />
          </Routes>
        </div>
      </div>

    </Router>
  );
}

export default App;

