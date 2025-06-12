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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";


interface Diagnostico {
    principal: string;
    secundario: string;
}

const opcionesDiagnostico = [
    "Enteritis por Salmonella",
    "Infección localizada por salmonella",
    "Infección no localizada por salmonella",
    "Sepsis debida a Salmonella"
];

const SeleccionDiagnostico: React.FC = () => {
    // Estado para manejar múltiples diagnósticos si es necesario
    const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);
    const [diagnosticoSeleccionado, setDiagnosticoSeleccionado] = useState<string>("");
    const [diagnosticoSecundario, setDiagnosticoSecundario] = useState<string>("");

    // Función toggle reutilizada del primer componente
    const toggleDiagnostico = (value: string) => {
        setDiagnosticoSeleccionado(prev => prev === value ? "" : value);
    };

    return (
        <div>
            {/* Selector de diagnóstico - Versión con dropdown similar al primer componente */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Diagnóstico</h3>
                    
                    {/* Versión con dropdown similar al de urgencias */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                {diagnosticoSeleccionado || "Buscar diagnóstico"} 
                                <FaChevronDown className="ml-2 h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64">
                            {opcionesDiagnostico.map((diagnostico) => (
                                <DropdownMenuCheckboxItem
                                    key={diagnostico}
                                    checked={diagnosticoSeleccionado === diagnostico}
                                    onCheckedChange={() => toggleDiagnostico(diagnostico)}
                                >
                                    {diagnostico}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    
                </div>
            </div>

            {/* Diagnóstico Principal y Secundario */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card className="p-4 text-center h-full md:col-span-1">
                    <p className="font-semibold text-blue-900">Diagnóstico Principal</p>
                    <p className="mt-2 font-bold">
                        {diagnosticoSeleccionado || "Ninguno seleccionado"}
                    </p>
                </Card>

                <Card className="p-4 text-center h-full md:col-span-2">
                    <p className="font-semibold text-blue-900">Diagnóstico Secundario</p>
                    <Input
                        type="text"
                        placeholder="Opcional - Llenar aquí"
                        className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-center"
                        value={diagnosticoSecundario}
                        onChange={(e) => setDiagnosticoSecundario(e.target.value)}
                    />
                </Card>
            </div>
        </div>
    );
};

export default SeleccionDiagnostico;