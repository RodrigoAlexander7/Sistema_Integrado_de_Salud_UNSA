import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "@/pages/Inicio"
import Busqueda from "@/pages/Busqueda";
import { LoginForm } from "@/components/login-form";
import Perfil from "@/pages/Perfil";
import Directorio from "./pages/Directorio";

function App() {
  return (
    <BrowserRouter>
    <div className="flex items-center justify-center min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
              <div className="w-full max-w-sm">
                <LoginForm />
              </div>
            </div>
          }
        />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/busqueda" element={<Busqueda />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/directorio" element={<Directorio />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
