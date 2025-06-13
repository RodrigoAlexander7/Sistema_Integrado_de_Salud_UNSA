import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutWithSidebar } from "./components/layout-with-sidebar";
import Inicio from "@/pages/Doctor/Inicio"
import Busqueda from "@/pages/Busqueda";
import { LoginForm } from "@/components/login-form";
import Perfil from "@/pages/Perfil";
import Directorio from "./pages/Directorio";
import InicioEnf from "./pages/Enfermeria/InicioEnfermeria"
import HistoriaClinicaIngreso from "./pages/Enfermeria/HistoriaClinicaIngreso"
import PacientesEspera from "./pages/Enfermeria/PacientesEspera"
import TriajePaciente from "./pages/Enfermeria/TriajePaciente"
import PacientesEsperaDoc from "./pages/Doctor/PacientesEspera"
import DiagnosticoTrabSoc from "./pages/Doctor/trabajo-social"
import DiagnosticoPsicologia from "./pages/Doctor/psicologia"
import DiagnosticoOftalmologia from "./pages/Doctor/oftalmologia"
import CambiarContrasena from "./pages/cambiarContrasena";
import ConfiguracionPage from "./pages/Configuracion";
import Odontograma from "./pages/Doctor/odontologia";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta de login - sin layout */}
          <Route
            path="/"
            element={
              <div className="flex min-h-screen w-full items-center justify-center p-6">
                <LoginForm />
              </div>
            }
          />
          
          {/* Rutas CON sidebar */}
          <Route element={<LayoutWithSidebar />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/busqueda" element={<Busqueda />} />
            <Route path="/directorio" element={<Directorio />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/psicologia-diagnostico" element={<DiagnosticoPsicologia />} />
            <Route path="/oftalmologia-diagnostico" element={<DiagnosticoOftalmologia />} />
            <Route path="/trabajo-social-diagnostico" element={<DiagnosticoTrabSoc />} />
            <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
            <Route path="/odontologia-diagnostico" element={<Odontograma />} />
            
          </Route>
          <Route path="/pacientesEspera" element={<PacientesEspera />} />
          <Route path="/pacientesEsperaDoc" element={<PacientesEsperaDoc />} />
          <Route path="/Inicio-Enfermeria" element={<InicioEnf />} />
          <Route path="/HistoriaClinica-Ingreso" element={<HistoriaClinicaIngreso />} />
          <Route path="/triaje" element={<TriajePaciente />} />
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
