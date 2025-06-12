import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pacientes_pendientes from "@/pages/Doctor/pacientes_pendientes"
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
import DiagnosticoOdontologia from "./pages/Doctor/odontologia"
import InicioDoc from "./pages/Doctor/InicioDoctor"


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
        <Route path="/Inicio/Doctor" element={<InicioDoc />} />
        <Route path="/pacientes_pendientes" element={<Pacientes_pendientes />} />
        <Route path="/busqueda" element={<Busqueda />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/directorio" element={<Directorio />} />
        <Route path="/Inicio-Enfermeria" element={<InicioEnf />} />
        <Route path="/HistoriaClinica-Ingreso" element={<HistoriaClinicaIngreso />} />
        <Route path="/pacientesEspera" element={<PacientesEspera />} />
        <Route path="/triaje" element={<TriajePaciente />} />
        <Route path="/pacientesEsperaDoc" element={<PacientesEsperaDoc />} />
        <Route path="/trabajo-social-diagnostico" element={<DiagnosticoTrabSoc />} />
        <Route path="/psicologia-diagnostico" element={<DiagnosticoPsicologia />} />
        <Route path="/oftalmologia-diagnostico" element={<DiagnosticoOftalmologia />} />
        <Route path="/odontologia-diagnostico" element={<DiagnosticoOdontologia />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
