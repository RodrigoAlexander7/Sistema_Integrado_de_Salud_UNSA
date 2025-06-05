import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SeleccionDiagnostico: React.FC = () => {
const [diagnostico, setDiagnostico] = useState<string>("");

return (
    <div>
    {/* Selector de diagnóstico */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div>
        <h3 className="font-semibold text-lg mb-2">Diagnóstico</h3>
        <Select onValueChange={(value) => setDiagnostico(value)}>
            <SelectTrigger>
            <SelectValue placeholder="Buscar diagnóstico" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="Enteritis por Salmonella">
                Enteritis por Salmonella
            </SelectItem>
            <SelectItem value="Infección localizada por salmonella">
                Infección localizada por salmonella
            </SelectItem>
            <SelectItem value="Infección no localizada por salmonella">
                Infección no localizada por salmonella
            </SelectItem>
            <SelectItem value="Sepsis debida a Salmonella">
                Sepsis debida a Salmonella
            </SelectItem>
            </SelectContent>
        </Select>

        {diagnostico && (
            <p className="mt-2 text-sm text-gray-600">
            Diagnóstico seleccionado:{" "}
            <span className="font-semibold">{diagnostico}</span>
            </p>
        )}
        </div>
    </div>

    {/* Diagnóstico Principal y Secundario */}
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
    );
};

export default SeleccionDiagnostico;