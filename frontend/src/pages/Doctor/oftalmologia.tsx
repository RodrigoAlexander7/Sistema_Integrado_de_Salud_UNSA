import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import FichaEstudiante from "@/components/FichaEstudiante";
import SeleccionDiagnostico from "@/components/diagnostico-primario-secundario";

const DiagnosticoOftalmologia: React.FC = () => {
  return (
    <div className="w-full">
      {/* Título principal */}
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <div className="w-full max-w-full">
          <div className="w-full mb-8">
            <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg rounded-xl border-none">
              <CardContent className="w-full flex flex-col items-center gap-4 py-6 px-0">
                <CardTitle className="text-4xl font-bold text-center text-blue-950">
                  Oftalmología
                </CardTitle>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Contenido */}
      <div className="w-full px-8">
        <div className="w-full max-w-6xl border border-gray-300 rounded-xl shadow-sm p-6 bg-white space-y-6">
          <FichaEstudiante />

          {/* Agudeza visual */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Agudeza visual</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sin Corrección */}
              <div>
                <h4 className="font-semibold mb-2">Sin Corrección</h4>
                <div className="grid grid-cols-3 gap-2 text-sm text-center border rounded p-3">
                  <span className="font-medium">Ojo</span>
                  <span>Lejos</span>
                  <span>Cerca</span>
                  <span>OD</span>
                  <span>20/20</span>
                  <span>J1</span>
                  <span>OI</span>
                  <span>20/25</span>
                  <span>J2</span>
                </div>
              </div>

              {/* Con Corrección */}
              <div>
                <h4 className="font-semibold mb-2">Con Corrección</h4>
                <div className="grid grid-cols-4 gap-2 text-sm text-center border rounded p-3">
                  <span className="font-medium col-span-1">Ojo</span>
                  <span>Lejos</span>
                  <span>Cerca</span>
                  <span>Lentes Utilizados</span>
                  <span>OD</span>
                  <span>20/20</span>
                  <span>J1</span>
                  <span>-2.50 esf +0.50 cil x180º</span>
                  <span>OI</span>
                  <span>20/25</span>
                  <span>J2</span>
                  <span>-2.75 esf +0.75 cil x170º</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Exámenes Oculares */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Exámenes Oculares</h3>

            {/* Refracción */}
            <div>
              <h4 className="font-semibold mb-2">Refracción</h4>
              <div className="grid grid-cols-6 gap-2 text-sm text-center border rounded p-3">
                <span>Ojo</span>
                <span>Esfera</span>
                <span>Cilindro</span>
                <span>Eje</span>
                <span>AV</span>
                <span></span>
                <span>OD</span>
                <span>-2.5</span>
                <span>+0.50</span>
                <span>180</span>
                <span>20/20</span>
                <span></span>
                <span>OI</span>
                <span>-2.5</span>
                <span>+0.50</span>
                <span>180</span>
                <span>20/20</span>
              </div>
            </div>

            {/* Presión Intraocular */}
            <div>
              <h4 className="font-semibold mb-2">Presión Intraocular</h4>
              <div className="grid grid-cols-5 gap-2 text-sm text-center border rounded p-3">
                <span>Ojo</span>
                <span>Valor (mmHg)</span>
                <span>Hora</span>
                <span>Método</span>
                <span></span>
                <span>OD</span>
                <span>14</span>
                <span>10:30</span>
                <span>Tonómetro de aire</span>
                <span></span>
                <span>OI</span>
                <span>15</span>
                <span>10:32</span>
                <span>Tonómetro de aire</span>
                <span></span>
              </div>
            </div>

            {/* Motilidad Ocular */}
            <div>
              <h4 className="font-semibold mb-2">Motilidad Ocular</h4>
              <div className="grid grid-cols-3 text-sm text-center border rounded p-3">
                <span>Movimiento</span>
                <span>OD</span>
                <span>OI</span>
                <span>Derecha</span>
                <span>Normal</span>
                <span>Normal</span>
                <span>Izquierda</span>
                <span>Limitada</span>
                <span>Normal</span>
                <span>Arriba</span>
                <span>Normal</span>
                <span>Normal</span>
                <span>Abajo</span>
                <span>Normal</span>
                <span>Normal</span>
              </div>
            </div>

            {/* Diagnóstico */}
            <SeleccionDiagnostico />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticoOftalmologia;
