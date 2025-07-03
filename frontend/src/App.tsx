import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutWithSidebar } from "./components/layout-with-sidebar";
import PacientesNuevos from "./pages/Doctor/pacientesNuevos";
import Busqueda from "@/pages/Busqueda";
import { LoginForm } from "@/components/login-form";
import Perfil from "@/pages/Perfil";
import Directorio from "./pages/Directorio";
import InicioEnf from "./pages/Enfermeria/InicioEnfermeria"
import HistoriaClinicaIngreso from "./pages/Enfermeria/HistoriaClinicaIngreso"
import PacientesEspera from "./pages/Enfermeria/PacientesEspera"
import TriajePaciente from "./pages/Enfermeria/TriajePaciente"
import PacientesEsperaDoc from "./pages/Doctor/PacientesEspera"
import DiagnosticoTrabSoc from "./pages/Doctor/diagnosticos/trabajo-social"
import DiagnosticoPsicologia from "./pages/Doctor/diagnosticos/psicologia"
import DiagnosticoOftalmologia from "./pages/Doctor/diagnosticos/oftalmologia"
import DiagnosticoMedicinaGeneral from "./pages/Doctor/diagnosticos/medicinaGeneral";
import InicioDoc from "./pages/Doctor/InicioDoctor"
import Pacientes_pendientes from "./pages/Doctor/pacientes_pendientes"
import CambiarContrasena from "./pages/cambiarContrasena";
import ConfiguracionPage from "./pages/Configuracion";
import Odontograma from "./pages/Doctor/diagnosticos/odontologia";
import { ThemeProvider } from "./context/ThemeContext";
import DiagnosticoNutricion from "./pages/Doctor/diagnosticos/nutricion";  
import InicioAdm from "./pages/Administrador/InicioAdministrador";
import IngresoDoctor from "./pages/Administrador/IngresoDoctor";
import RegistroEnfermera from "./pages/Administrador/ingresoEnfermera.";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
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
            <Route path="/pacientes-nuevos" element={<PacientesNuevos />} />
            <Route path="/busqueda" element={<Busqueda />} />
            <Route path="/directorio" element={<Directorio />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/psicologia-diagnostico" element={<DiagnosticoPsicologia />} />
            <Route path="/oftalmologia-diagnostico" element={<DiagnosticoOftalmologia />} />
            <Route path="/trabajo-social-diagnostico" element={<DiagnosticoTrabSoc />} />
            <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
            <Route path="/odontologia-diagnostico" element={<Odontograma />} />
            <Route path="/Inicio-doctor" element={<InicioDoc />} />
            <Route path="/inicio-enfermeria" element={<InicioEnf />} />
            <Route path="/pacientes-pendientes" element={<Pacientes_pendientes />} />          
            <Route path="/nutricion-diagnostico" element={<DiagnosticoNutricion />} />
            <Route path="/medicina-general-diagnostico" element={<DiagnosticoMedicinaGeneral />} />
            <Route path="/inicio-admin" element={<InicioAdm />} />
          </Route>
          <Route path="/pacientes-espera" element={<PacientesEspera />} />
          
          <Route path="/pacientes-espera-doctor" element={<PacientesEsperaDoc />} />
          <Route path="/ingreso-historia-clinica" element={<HistoriaClinicaIngreso />} />
          <Route path="/triaje" element={<TriajePaciente />} />
          <Route path="/ingresar-nuevo-doctor" element={<IngresoDoctor />} />
          <Route path="/ingresar-nueva-enfermera" element={<RegistroEnfermera />} />

          
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
