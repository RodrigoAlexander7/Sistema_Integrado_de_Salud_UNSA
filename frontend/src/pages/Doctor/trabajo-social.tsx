import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import FichaEstudiante from "@/components/FichaEstudiante";
import SeleccionDiagnostico from "@/components/diagnostico-primario-secundario";

const DiagnosticoTrabSoc: React.FC = () => {
  return (
    <div className="w-full">
      {/* Título principal */}
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <div className="w-full max-w-full">
          <div className="w-full mb-8">
            <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg rounded-xl border-none">
              <CardContent className="w-full flex flex-col items-center gap-4 py-6 px-0">
                <CardTitle className="text-4xl font-bold text-center text-blue-950">
                  Trabajo Social
                </CardTitle>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Contenido */}
      <div className="w-full px-8">
        <div className="w-full max-w-6xl border border-gray-300 rounded-xl shadow-sm p-6 bg-white">
          <FichaEstudiante />

          {/* Evaluaciones */}
          <div className="grid gap-4 mt-6">
            {[
              "Evaluación Socioeconómica",
              "Dinámica Familiar",
              "Redes de Apoyo",
              "Intervención y seguimiento de caso",
            ].map((titulo, idx) => (
              <Card key={idx} className="p-4 border border-slate-300 rounded-md shadow-sm bg-white">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <p className="font-semibold text-blue-900 text-lg">{titulo}</p>
                  <Input
                    type="text"
                    placeholder="Completar aquí"
                    className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Diagnóstico */}
          <SeleccionDiagnostico />
        </div>
      </div>
    </div>
  );
};

export default DiagnosticoTrabSoc;
