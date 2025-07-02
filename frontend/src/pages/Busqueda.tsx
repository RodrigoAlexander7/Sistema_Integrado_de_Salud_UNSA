import { useState } from "react";
import { BarraBusqueda } from "@/components/barra-busqueda";
import { ResultadoCard } from "@/components/ResultadoCard";
import { Button } from "@/components/ui/button";
import EmptyStateCard from "@/components/EmptyStateCard";
import { SearchService } from "@/services/searchService";
import type { PatientSearchResult } from "@/types/searchTypes";
import { useTheme } from "@/context/ThemeContext";

function Busqueda() {
  const { theme } = useTheme();
  const [cui, setCui] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [resultados, setResultados] = useState<PatientSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    setLoading(true);
    try {
      const filters = {
        cui: cui.trim() || undefined,
        nombre: nombre.trim() || undefined,
        fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
        fechaFin: fechaFin ? new Date(fechaFin) : undefined
      };

      const resultados = await SearchService.searchPatients(filters);
      setResultados(resultados);
    } catch (error) {
      console.error("Error en búsqueda:", error);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLimpiar = () => {
    setCui("");
    setNombre("");
    setFechaInicio("");
    setFechaFin("");
    setResultados([]);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <BarraBusqueda
          cui={cui}
          setCui={setCui}
          nombre={nombre}
          setNombre={setNombre}
          fechaInicio={fechaInicio}
          setFechaInicio={setFechaInicio}
          fechaFin={fechaFin}
          setFechaFin={setFechaFin}
          onBuscar={handleBuscar}
          onLimpiar={handleLimpiar}
          loading={loading}
        />

        <div className="w-full max-w-[90rem] mx-auto">
          <h2 className={`text-2xl font-bold py-8 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}>
            Resultados de Búsqueda
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : resultados.length > 0 ? (
            <>
              {/* Encabezados de columnas */}
              <div className={`grid grid-cols-12 gap-4 px-6 py-4 text-lg font-bold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="col-span-2">CUI</span>
                <span className="col-span-4">Nombre</span>
                <span className="col-span-2">Fecha Nac.</span>
                <span className="col-span-2">Programa</span>
                <span className="col-span-2 text-center">Acción</span>
              </div>

              {/* Resultados */}
              <div className="flex flex-col gap-4">
                {resultados.map((paciente) => (
                  <ResultadoCard
                    key={paciente.cui}
                    columnas={[
                      { contenido: paciente.cui, ancho: "2" },
                      { 
                        contenido: paciente.nombre, 
                        ancho: "4", 
                        truncar: true 
                      },
                      { 
                        contenido: paciente.fechaNacimiento.toLocaleDateString(), 
                        ancho: "2" 
                      },
                      { 
                        contenido: paciente.programaAcademico, 
                        ancho: "2",
                        truncar: true
                      },
                      { 
                        contenido: (
                          <Button 
                            variant="outline" 
                            className={`w-full ${
                              theme === 'dark' 
                                ? 'border-gray-600 hover:bg-gray-700' 
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            Ver Historial
                          </Button>
                        ),
                        ancho: "2"
                      }
                    ]}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyStateCard
              title="No se encontraron resultados"
              description="Intenta con otros criterios de búsqueda."
              icon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`h-12 w-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              }
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Busqueda;