import React, { useState } from "react";

type DienteCondicion = "sano" | "caries" | "restaurado" | "ausente" | "protesis";

interface Cuadrante {
    id: number;
    nombre: string;
    dientes: number[];
    clase: string;
    }

    const Odontograma2: React.FC = () => {
    // Datos del odontograma (numeración FDI)
    const cuadrantes: Cuadrante[] = [
        {
        id: 1,
        nombre: "Cuadrante Superior Derecho",
        dientes: [18, 17, 16, 15, 14, 13, 12, 11],
        clase: "flex-row-reverse"
        },
        {
        id: 2,
        nombre: "Cuadrante Superior Izquierdo",
        dientes: [21, 22, 23, 24, 25, 26, 27, 28],
        clase: "flex-row"
        },
        {
        id: 3,
        nombre: "Cuadrante Inferior Izquierdo",
        dientes: [31, 32, 33, 34, 35, 36, 37, 38],
        clase: "flex-row"
        },
        {
        id: 4,
        nombre: "Cuadrante Inferior Derecho",
        dientes: [48, 47, 46, 45, 44, 43, 42, 41],
        clase: "flex-row-reverse"
        }
    ];

    // Estados para seguimiento dental
    const [dienteSeleccionado, setDienteSeleccionado] = useState<number | null>(null);
    const [condiciones, setCondiciones] = useState<Record<number, DienteCondicion>>({});

    const manejarClickDiente = (diente: number) => {
        setDienteSeleccionado(diente === dienteSeleccionado ? null : diente);
    };

    const cambiarCondicion = (condicion: DienteCondicion) => {
        if (!dienteSeleccionado) return;
        setCondiciones(prev => ({
        ...prev,
        [dienteSeleccionado]: condicion
        }));
    };

    // Colores para diferentes condiciones
    const coloresCondiciones: Record<DienteCondicion, string> = {
        sano: "bg-green-100 border-green-400",
        caries: "bg-red-100 border-red-400",
        restaurado: "bg-blue-100 border-blue-400",
        ausente: "bg-gray-200 border-gray-400",
        protesis: "bg-purple-100 border-purple-400"
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Odontograma Clínico
        </h1>
        
        {/* Selector de condiciones */}
        {dienteSeleccionado && (
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">
                Diente {dienteSeleccionado} - Editar condición
            </h3>
            <div className="flex flex-wrap gap-2">
                {Object.entries({
                sano: "Sano",
                caries: "Caries",
                restaurado: "Restaurado",
                ausente: "Ausente",
                protesis: "Prótesis"
                }).map(([key, value]) => (
                <button
                    key={key}
                    onClick={() => cambiarCondicion(key as DienteCondicion)}
                    className={`px-3 py-1 rounded-md ${
                    condiciones[dienteSeleccionado] === key
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                    {value}
                </button>
                ))}
            </div>
            </div>
        )}

        {/* Odontograma */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cuadrantes.map((cuadrante) => (
            <div
                key={cuadrante.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
                <h2 className="text-lg font-semibold text-center text-gray-700 mb-4 pb-2 border-b">
                {cuadrante.nombre}
                </h2>
                <div className={`flex ${cuadrante.clase} flex-wrap gap-3 justify-center`}>
                {cuadrante.dientes.map((diente) => (
                    <div
                    key={diente}
                    onClick={() => manejarClickDiente(diente)}
                    className={`w-14 h-20 flex flex-col items-center justify-center rounded-md border-2 cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 ${
                        coloresCondiciones[condiciones[diente] as DienteCondicion] || "bg-white border-gray-300"
                    } ${dienteSeleccionado === diente ? "ring-2 ring-indigo-500" : ""}`}
                    >
                    <span className="font-bold text-gray-700">{diente}</span>
                    <div className="w-full flex-1 mt-1 flex flex-col items-center justify-around p-1">
                        <div className="w-full h-2 bg-yellow-200 rounded-sm border-t border-yellow-400"></div>
                        <div className="w-full h-2 bg-red-200 rounded-sm border-t border-red-400"></div>
                        <div className="w-full h-2 bg-green-200 rounded-sm border-t border-green-400"></div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            ))}
        </div>

        {/* Leyenda */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-center mb-3">Leyenda</h3>
            <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(coloresCondiciones).map(([key, _]) => (
                <div key={key} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-sm ${coloresCondiciones[key as DienteCondicion].replace("100", "300").replace("border", "bg")}`}></div>
                <span className="capitalize text-sm">{key}</span>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default Odontograma2;