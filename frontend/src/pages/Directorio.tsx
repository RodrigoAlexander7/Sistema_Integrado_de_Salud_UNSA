import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarraDirectorio } from "@/components/barra-directorio";
import { ResultadoCard } from "@/components/ResultadoCard";
import Sidebar from "@/components/sidebar";

function Directorio() {
  const [especialidad, setEspecialidad] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");

  const datos = [
    {
      nombre: "Ana Ramos",
      especialidad: "Odontología",
      disponibilidad: "disponible",
      correo: "ana@ejemplo.com",
      telefono: "999888777",
    },
    {
      nombre: "Luis Gómez",
      especialidad: "Medicina",
      disponibilidad: "no_disponible",
      correo: "luis@ejemplo.com",
      telefono: "999888666",
    },
    {
      nombre: "Sofía Mendoza",
      especialidad: "Psicología",
      disponibilidad: "disponible",
      correo: "sofia@ejemplo.com",
      telefono: "999777666",
    },
  ];

  const [filtrados, setFiltrados] = useState(datos);

  const handleBuscar = () => {
    const resultado = datos.filter((r) => {
      const matchEsp =
        especialidad === "" ||
        r.especialidad.toLowerCase() === especialidad.toLowerCase();
      const matchDisp =
        disponibilidad === "" || r.disponibilidad === disponibilidad;
      return matchEsp && matchDisp;
    });
    setFiltrados(resultado);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-8">
        <BarraDirectorio
          especialidad={especialidad}
          disponibilidad={disponibilidad}
          onEspecialidadChange={setEspecialidad}
          onDisponibilidadChange={setDisponibilidad}
          onBuscar={handleBuscar}
        />

        <div className="w-full max-w-7xl mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">Personal:</h2>

          {/* Encabezado alineado */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-2x1 font-bold text-gray-600">
            <span className="col-span-5">Nombre</span>
            <span className="col-span-3">Especialidad</span>
            <span className="col-span-3">Disponibilidad</span>
            <span className="col-span-1">Contacto</span>
          </div>

          {/* Resultados */}
           <div className="flex flex-col gap-4">
            {filtrados.map((r) => (
              <ResultadoCard
                key={r.telefono}
                columnas={[
                  { 
                    contenido: r.nombre, 
                    ancho: "5",
                    truncar: true
                  },
                  { 
                    contenido: r.especialidad, 
                    ancho: "3" 
                  },
                  { 
                    contenido: (
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        r.disponibilidad === "disponible" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {r.disponibilidad === "disponible" ? "Disponible" : "No disponible"}
                      </span>
                    ),
                    ancho: "3"
                  },
                  { 
                    contenido: (
                      <div className="flex gap-2 w-full justify-end">
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
                    ),
                    ancho: "1"
                  }
                ]}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Directorio;
