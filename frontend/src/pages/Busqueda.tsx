import React from "react";
import { BarraBusqueda } from "@/components/barra-busqueda";
import BarraOpciones from "@/components/barra-opciones";
import ResultadoCard from "@/components/ResultadoCard"; // Ajusta la ruta según tu proyecto

function Busqueda() {
  const resultados = [
    { cui: "20211001", nombre: "Juan Pérez Torres", fecha: "2023-11-12" },
    { cui: "20211002", nombre: "María López Díaz", fecha: "2023-10-08" },
    { cui: "20211003", nombre: "Carlos Ruiz Vega", fecha: "2023-09-20" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <BarraOpciones />

      <main className="flex-grow px-4 py-6 flex flex-col gap-6">
        <BarraBusqueda />

        <div className="w-full max-w-7xl mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">Resultados:</h2>

          {/* Encabezados */}
          <div className="grid grid-cols-4 font-semibold text-gray-600 mb-2 px-2 md:px-6">
            <span>CUI</span>
            <span>Nombre y Apellidos</span>
            <span>Fecha</span>
            <span></span> {/* espacio para el botón */}
          </div>

          {/* Resultados */}
          <div className="flex flex-col gap-4">
            {resultados.map((r) => (
              <ResultadoCard key={r.cui} cui={r.cui} nombre={r.nombre} fecha={r.fecha} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Busqueda;
