import { useState } from "react";
import { BarraBusqueda } from "@/components/barra-busqueda";
import { ResultadoCard } from "@/components/ResultadoCard";
import { Button } from "@/components/ui/button";

function Busqueda() {
  const [cui, setCui] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const resultadosCompletos = [
    { cui: "20211001", nombre: "Juan Pérez Torres", fecha: "2023-11-12" },
    { cui: "20211002", nombre: "María López Díaz", fecha: "2023-10-08" },
    { cui: "20211003", nombre: "Carlos Ruiz Vega", fecha: "2023-09-20" },
  ];

  const [resultadosFiltrados, setResultadosFiltrados] = useState(resultadosCompletos);

  const handleBuscar = () => {
    const resultados = resultadosCompletos.filter((r) => {
      const matchCui = cui === "" || r.cui.includes(cui);
      const matchNombre = nombre === "" || 
        r.nombre.toLowerCase().includes(nombre.toLowerCase());
      let matchFecha = true;
      if (fechaInicio && fechaFin) {
        const fechaRegistro = new Date(r.fecha);
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        matchFecha = fechaRegistro >= inicio && fechaRegistro <= fin;
      }
      return matchCui && matchNombre && matchFecha;
    });

    setResultadosFiltrados(resultados);
  };

  const handleLimpiar = () => {
    setCui("");
    setNombre("");
    setFechaInicio("");
    setFechaFin("");
    setResultadosFiltrados(resultadosCompletos);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-8">
        <BarraBusqueda />

        <div className="w-full max-w-[90rem] mx-auto">
          <h2 className="text-2xl font-bold py-8">Resultados de Búsqueda</h2>

          {/* Encabezados de columnas */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-2x1 font-bold text-gray-600">
            <span className="col-span-2">CUI</span>
            <span className="col-span-5">Nombre</span>
            <span className="col-span-3">Fecha</span>
            <span className="col-span-2 text-center">Acción</span>
          </div>

          {/* Resultados filtrados */}
          <div className="flex flex-col gap-4">
            {resultadosFiltrados.length > 0 ? (
              resultadosFiltrados.map((r) => (
                <ResultadoCard
                  key={r.cui}
                  columnas={[
                    { contenido: r.cui, ancho: "2" },
                    { contenido: r.nombre, ancho: "5", truncar: true },
                    { contenido: new Date(r.fecha).toLocaleDateString(), ancho: "3" },
                    { 
                      contenido: (
                        <Button variant="outline" className="border-gray-300 w-full">
                          Ver Historial
                        </Button>
                      ),
                      ancho: "2"
                    }
                  ]}
                />
              ))
            ) : (
              <ResultadoCard
                columnas={[
                  { contenido: "No se encontraron resultados", ancho: "full", alineacion: "centro" }
                ]}
                className="text-gray-500"
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Busqueda;