import React from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import BarraOpciones from "../../components/barra-opciones-doctor";
import FichaEstudiante from "../../components/FichaEstudiante";
import Seleccion_diagnostico from "../../components/diagnostico-primario-secundario";

const DiagnosticoPsicologia = () => {
    return (
        <div className="w-full min-h-screen flex flex-col">
        <BarraOpciones />

        <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg p-4">
            <h1 className="text-4xl font-bold text-center mt-8 mb-8 text-blue-950">
            PSICOLOGIA
            </h1>
        </Card>

        <div className="min-h-screen bg-white p-6 md:p-10 text-slate-800">
            <div className="border border-gray-300 rounded-md p-6">

            <FichaEstudiante/>
            {/* Evaluaciones */}
            <div className="grid gap-4">
                {[
                "Evaluación Mental",
                "Test aplicado",
                "Plan de Intervención",
                "Evolución",
                ].map((titulo, idx) => (
                <Card
                    key={idx}
                    className="p-4 border border-slate-300 rounded-md shadow-sm bg-white"
                >
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

            <Seleccion_diagnostico/>
            
            </div>
        </div>
        </div>
    );
};

export default DiagnosticoPsicologia;
