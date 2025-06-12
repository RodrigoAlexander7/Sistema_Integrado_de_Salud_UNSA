import React from "react";

const dienteStyle =
  "w-8 h-8 flex items-center justify-center border border-gray-400 rounded text-xs shadow-sm bg-white";

const generarSecuencia = (inicio: number, cantidad: number): number[] => {
  return Array.from({ length: cantidad }, (_, i) => inicio + i);
};

const OdontogramaCuadricula: React.FC = () => {
  return (
    <div className="relative inline-block bg-gray-50 p-4 rounded shadow-md">
      {/* Línea divisoria vertical */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-500 z-0" />

      <div className="space-y-3 relative z-10">
        {/* Fila 1: 16 dientes */}
        <div className="flex justify-center gap-1">
          {generarSecuencia(11, 16).map((num) => (
            <div key={num} className={dienteStyle}>
              {num}
            </div>
          ))}
        </div>

        {/* Fila 2: 10 dientes */}
        <div className="flex justify-center gap-1">
          {generarSecuencia(21, 10).map((num) => (
            <div key={num} className={dienteStyle}>
              {num}
            </div>
          ))}
        </div>

        {/* Separación entre superior e inferior */}
        <div className="h-4" />

        {/* Fila 3: 10 dientes */}
        <div className="flex justify-center gap-1">
          {generarSecuencia(31, 10).map((num) => (
            <div key={num} className={dienteStyle}>
              {num}
            </div>
          ))}
        </div>

        {/* Fila 4: 10 dientes */}
        <div className="flex justify-center gap-1">
          {generarSecuencia(41, 16).map((num) => (
            <div key={num} className={dienteStyle}>
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OdontogramaCuadricula;
