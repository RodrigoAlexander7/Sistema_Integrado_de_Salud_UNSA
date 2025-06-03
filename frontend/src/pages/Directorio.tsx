import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarraDirectorio } from "@/components/barra-directorio";
import BarraOpciones from "@/components/barra-opciones";
import ResultadoCard from "@/components/ResultadoCard";

function Directorio() {
  const [especialidad, setEspecialidad] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");

  const datos = [
    { nombre: "Ana Ramos", especialidad: "Odontología", disponibilidad: "disponible", correo: "ana@ejemplo.com", telefono: "999888777" },
    { nombre: "Luis Gómez", especialidad: "Medicina", disponibilidad: "no_disponible", correo: "luis@ejemplo.com", telefono: "999888666" },
    { nombre: "Sofía Mendoza", especialidad: "Psicología", disponibilidad: "disponible", correo: "sofia@ejemplo.com", telefono: "999777666" },
  ];

  const [filtrados, setFiltrados] = useState(datos);

  const handleBuscar = () => {
    const resultado = datos.filter((r) => {
      const matchEsp = especialidad === "" || r.especialidad.toLowerCase() === especialidad.toLowerCase();
      const matchDisp = disponibilidad === "" || r.disponibilidad === disponibilidad;
      return matchEsp && matchDisp;
    });
    setFiltrados(resultado);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
        <BarraOpciones />
        
      <main className="flex-grow px-4 py-6 flex flex-col gap-6">
        <BarraDirectorio
          especialidad={especialidad}
          disponibilidad={disponibilidad}
          onEspecialidadChange={setEspecialidad}
          onDisponibilidadChange={setDisponibilidad}
          onBuscar={handleBuscar}
        />

        <div className="w-full max-w-7xl mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">Personal:</h2>

          <div className="grid grid-cols-4 font-semibold text-gray-600 mb-2 px-2 md:px-6">
            <span>Nombre</span>
            <span>Especialidad</span>
            <span>Disponibilidad</span>
            <span className="text-right">Contacto</span>
          </div>


          <div className="flex flex-col gap-4">
            {filtrados.length > 0 ? (
              filtrados.map((r, i) => (
                <ResultadoCard
                  key={i}
                  columnas={[
                    r.nombre,
                    r.especialidad,
                    r.disponibilidad === "disponible" ? "Disponible" : "No disponible",
                    <div
                        key="contacto"
                        className="flex items-center justify-end gap-2"
                        >
                        <a href={`mailto:${r.correo}`}>
                            <Button variant="ghost" size="icon" className="text-blue-600">
                            <Mail className="w-4 h-4" />
                            </Button>
                        </a>
                        <a href={`tel:${r.telefono}`}>
                            <Button variant="ghost" size="icon" className="text-green-600">
                            <Phone className="w-4 h-4" />
                            </Button>
                        </a>
                    </div>
                  ]}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 mt-6">No se encontraron resultados.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Directorio;
