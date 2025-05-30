<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import Inicio from "@/pages/Inicio";
import Perfil from "@/pages/Perfil";
import './App.css';
import { useEffect, useState } from "react";

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
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import Inicio from "@/components/Inicio"; 
import { TestConection } from "@/components/test"; 

import './App.css';
>>>>>>> 9ef602bc127159a608b6db3113d911e72ed45397

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Layout />
=======
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/TestConection" element={<TestConection />} />
          </Routes>
        </div>
      </div>
>>>>>>> 9ef602bc127159a608b6db3113d911e72ed45397
    </Router>
  );
}

export default App;

<<<<<<< HEAD

=======
>>>>>>> 9ef602bc127159a608b6db3113d911e72ed45397
