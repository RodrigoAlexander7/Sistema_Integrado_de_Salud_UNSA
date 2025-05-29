import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import Inicio from "@/components/Inicio"; 

import './App.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/Inicio" element={<Inicio />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

