import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BarraOpciones from "../../components/barra-opciones-doctor";
import FichaEstudiante from "../../components/FichaEstudiante";

const DiagnosticoTrabSoc = () => {
    const [diagnostico, setDiagnostico] = useState<string>("");

    return (
        <div className="w-full min-h-screen flex flex-col">
        <BarraOpciones />

        <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg p-4">
            <h1 className="text-4xl font-bold text-center mt-8 mb-8 text-blue-950">
            TRABAJO SOCIAL
            </h1>
        </Card>

        <div className="min-h-screen bg-white p-6 md:p-10 text-slate-800">
            <div className="border border-gray-300 rounded-md p-6">

            <FichaEstudiante/>

            {/* Evaluaciones */}
            <div className="grid gap-4">
                {[
                "Evaluación Socioeconómica",
                "Dinámica Familiar",
                "Redes de Apoyo",
                "Intervención y seguimiento de caso",
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

                {/* Select de Diagnóstico */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div>
                    <h3 className="font-semibold text-lg mb-2">Diagnóstico</h3>
                    <Select onValueChange={(value) => setDiagnostico(value)}>
                        <SelectTrigger>
                        <SelectValue placeholder="Buscar diagnóstico" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Enteritis por Salmonella">Enteritis por Salmonella</SelectItem>
                        <SelectItem value="Infección localizada por salmonella">Infección localizada por salmonella</SelectItem>
                        <SelectItem value="Infección no localizada por salmonella">Infección no localizada por salmonella</SelectItem>
                        <SelectItem value="Sepsis debida a Salmonella">Sepsis debida a Salmonella</SelectItem>
                        </SelectContent>
                    </Select>

                    {diagnostico && (
                        <p className="mt-2 text-sm text-gray-600">
                        Diagnóstico seleccionado: <span className="font-semibold">{diagnostico}</span>
                        </p>
                    )}
                    </div>
                </div>
                {/* Diagnóstico Principal y Secundario con proporción 1/3 y 2/3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card className="p-4 text-center h-full md:col-span-1">
                    <p className="font-semibold text-blue-900">Diagnóstico Principal</p>
                    <p className="mt-2 font-bold">
                    {diagnostico || "Ninguno seleccionado"}
                    </p>
                </Card>

                <Card className="p-4 text-center h-full md:col-span-2">
                    <p className="font-semibold text-blue-900">Diagnóstico Secundario</p>
                    <Input
                    type="text"
                    placeholder="Opcional - Llenar aquí"
                    className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-center"
                    />
                </Card>
                </div>
            
            </div>
        </div>
        </div>
    );
};

export default DiagnosticoTrabSoc;
