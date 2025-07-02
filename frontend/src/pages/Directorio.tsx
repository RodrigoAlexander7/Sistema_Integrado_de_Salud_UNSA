import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarraDirectorio } from "@/components/barra-directorio";
import { ResultadoCard } from "@/components/ResultadoCard";
import EmptyStateCard from "@/components/EmptyStateCard";
import { DirectoryService } from "@/services/directoryService";
import type { MedicalStaff } from "@/types/directoryTypes";
import { useTheme } from "@/context/ThemeContext";

function Directorio() {
  const { theme } = useTheme();
  const [especialidad, setEspecialidad] = useState<string>("");
  const [disponibilidad, setDisponibilidad] = useState<string>("");
  const [staff, setStaff] = useState<MedicalStaff[]>([]);
  const [filtrados, setFiltrados] = useState<MedicalStaff[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const data = await DirectoryService.getMedicalStaff();
        setStaff(data);
        setFiltrados(data);
      } catch (error) {
        console.error("Error loading staff:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleBuscar = () => {
    const filters = {
      especialidad: especialidad || undefined,
      disponibilidad: disponibilidad as "disponible" | "no_disponible" | undefined
    };

    const resultado = staff.filter((r) => {
      const matchEsp = !filters.especialidad || 
        r.especialidad.toLowerCase().includes(filters.especialidad.toLowerCase());
      const matchDisp = !filters.disponibilidad || 
        r.disponibilidad === filters.disponibilidad;
      return matchEsp && matchDisp;
    });

    setFiltrados(resultado);
  };

  const handleLimpiar = () => {
    setEspecialidad("");
    setDisponibilidad("");
    setFiltrados(staff);
  };

  if (loading) {
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <BarraDirectorio
          especialidad={especialidad}
          disponibilidad={disponibilidad}
          onEspecialidadChange={setEspecialidad}
          onDisponibilidadChange={setDisponibilidad}
          onBuscar={handleBuscar}
          onLimpiar={handleLimpiar}
          loading={loading}
        />

        <div className="w-full max-w-7xl mx-auto mt-8">
          <h2 className={`text-xl font-bold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}>
            Personal:
          </h2>

          {filtrados.length > 0 ? (
            <>
              {/* Encabezado alineado */}
              <div className={`grid grid-cols-12 gap-4 px-6 py-4 text-lg font-bold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="col-span-5">Nombre</span>
                <span className="col-span-3">Especialidad</span>
                <span className="col-span-2">Disponibilidad</span>
                <span className="col-span-2">Contacto</span>
              </div>

              {/* Resultados */}
              <div className="flex flex-col gap-4">
                {filtrados.map((persona) => (
                  <ResultadoCard
                    key={`${persona.id}-${persona.telefono}`}
                    columnas={[
                      { 
                        contenido: `${persona.nombre} ${persona.apellidos}`, 
                        ancho: "5", 
                        truncar: true 
                      },
                      { 
                        contenido: persona.especialidad, 
                        ancho: "3" 
                      },
                      {
                        contenido: (
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              persona.disponibilidad === "disponible"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {persona.disponibilidad === "disponible" ? "Disponible" : "No disponible"}
                          </span>
                        ),
                        ancho: "2",
                      },
                      {
                        contenido: (
                          <div className="flex gap-2 w-full">
                            <a href={`mailto:${persona.correo}`}>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={`text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 ${
                                  theme === 'dark' ? 'hover:bg-blue-900/20' : ''
                                }`}
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                            </a>
                            <a href={`tel:${persona.telefono}`}>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={`text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 ${
                                  theme === 'dark' ? 'hover:bg-green-900/20' : ''
                                }`}
                              >
                                <Phone className="w-4 h-4" />
                              </Button>
                            </a>
                          </div>
                        ),
                        ancho: "2",
                      },
                    ]}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyStateCard
              title="No se encontró personal"
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <line x1="17" y1="8" x2="22" y2="13"></line>
                  <line x1="22" y1="8" x2="17" y2="13"></line>
                </svg>
              }
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Directorio;