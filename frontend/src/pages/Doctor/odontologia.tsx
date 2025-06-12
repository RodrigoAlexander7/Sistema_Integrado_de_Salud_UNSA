import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FichaEstudiante from "../../components/FichaEstudiante";
//import OdontogramaCuadricula from "../../components/odontograma";
import Odontograma2 from "@/components/Odontograma2";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Seleccion_diagnostico from "../../components/diagnostico-primario-secundario";


const DiagnosticoOdontologia: React.FC = () => {
    return (
        <div className="min-h-screen bg-white text-gray-800 p-6 md:p-10 space-y-6">
        {/* Título */}
        <Card className="bg-gradient-to-br from-blue-200 via-blue-100 to-sky-100 shadow p-4">
            <h1 className="text-4xl font-bold text-center text-blue-950">OFTALMOLOGÍA</h1>
        </Card>
        <FichaEstudiante/>
        {/* Odontograma + Especificaciones */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="p-4 md:col-span-2 flex justify-center items-center">
                <Odontograma2/>
            </Card>
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold mb-1">Especificaciones:</h3>
                <textarea className="w-full border p-2 rounded resize-none h-20" />
            </div>

            <div>
                <h3 className="font-semibold mb-1">Hallazgos:</h3>
                <div className="text-sm space-y-1">
                <div className="flex justify-between">
                    <span>Aparato Ortodóntico Fijo</span>
                    <span>21–26</span>
                </div>
                <div className="flex justify-between">
                    <span>Aparato Ortodóntico Fijo</span>
                    <span>21–26</span>
                </div>
                </div>
            </div>

            {/* Agregar Hallazgo */}
            <div className="mt-4 space-y-2">
                <h3 className="font-semibold">Agregar Hallazgo</h3>
                <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Descripción" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Corona Definitiva">Corona Definitiva</SelectItem>
                    <SelectItem value="Corona Temporal">Corona Temporal</SelectItem>
                    <SelectItem value="Desgaste Oclusal">Desgaste Oclusal</SelectItem>
                    <SelectItem value="Diente ausente">Diente ausente</SelectItem>
                </SelectContent>
                </Select>

                <div className="flex gap-2">
                <Input type="number" placeholder="Inicio" />
                <Input type="number" placeholder="Fin" />
                </div>
                <Button className="w-full">Agregar</Button>
            </div>
            </div>
        </div>

        {/* Procedimientos Dentales */}
        <Card className="p-4 mb-6">
            <h3 className="font-semibold mb-4 text-blue-900">Procedimientos Dentales</h3>
            <div className="text-sm space-y-2">
            {[1, 2, 3].map((_, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                <p>Septicemia debida a Salmonella</p>
                <p>xx–xx</p>
                <p>20/06/2025</p>
                </div>
            ))}
            </div>
        </Card>
        <Seleccion_diagnostico/>
        
        </div>
    );
};

export default DiagnosticoOdontologia;
