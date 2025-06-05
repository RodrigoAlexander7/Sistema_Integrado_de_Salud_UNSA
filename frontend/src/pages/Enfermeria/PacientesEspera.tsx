import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import BarraOpciones from "../../components/barra-opciones-enfermeria";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Paciente {
    nombre: string;
    motivo: string;
    sintomas: string;
    especialidad: string;
}

const opcionesUrgencia = ["Estandar", "Prioridad", "Urgencia"];

const PacientesEspera: React.FC = () => {
    const pacientes: Paciente[] = [
    { nombre: "Leonel Messi", motivo: "Dolor abdominal", sintomas: "Náuseas y vómitos", especialidad: "Psicología, T. Social", urgencia: "Prioridad" },
    { nombre: "Fernando Alonso", motivo: "Tos persistente", sintomas: "Dificultad para respirar leve", especialidad: "Psicología, T. Social", urgencia: "Estandar" },
    { nombre: "Juan Perez", motivo: "Ansiedad", sintomas: "Problemas para dormir", especialidad: "Psicología, T. Social", urgencia: "Urgencia" },
];

    const [urgenciasSeleccionadas, setUrgenciasSeleccionadas] = useState<string[]>(Array(pacientes.length).fill(""));

    const toggleUrgencia = (index: number, value: string) => {
        const nuevas = [...urgenciasSeleccionadas];
        nuevas[index] = value;
        setUrgenciasSeleccionadas(nuevas);
    };

    const navigate = useNavigate();
    const handlePacientesEspera = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/pacientesEspera");
    };

    return (
        <div className="w-full min-h-screen bg-white px-6 py-8">
            <BarraOpciones />
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Pacientes en Espera</h1>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Input placeholder="Buscar por Nombre de paciente" className="max-w-md" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#1c398e" }} />
                </div>
            </div>

            {/* Tabla de pacientes */}
            <div className="w-full border rounded-lg overflow-hidden shadow-sm">
                <div className="grid grid-cols-6 bg-gray-100 px-4 py-2 font-medium text-sm text-gray-700">
                    <div>Nombre</div>
                    <div>Motivo de consulta</div>
                    <div>Síntomas</div>
                    <div>Urgencia</div>
                    <div>Especialidad</div>
                    <div>Historia Clínica</div>
                </div>

                {pacientes.map((paciente, index) => (
                    <div key={index} className="grid grid-cols-6 px-4 py-3 border-t items-center">
                        <div>{paciente.nombre}</div>
                        <div>{paciente.motivo}</div>
                        <div>{paciente.sintomas}</div>

                        {/* Dropdown Urgencia */}
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-36 justify-between">
                                        {urgenciasSeleccionadas[index] || "Seleccionar"} <FaChevronDown className="ml-2 h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-40">
                                    {opcionesUrgencia.map((u) => (
                                        <DropdownMenuCheckboxItem
                                            key={u}
                                            checked={urgenciasSeleccionadas[index] === u}
                                            onCheckedChange={() => toggleUrgencia(index, u)}
                                        >
                                            {u}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Especialidad mostrada directamente */}
                        <div className="text-sm text-gray-800">{paciente.especialidad}</div>

                        {/* Botón Historia Clínica */}
                        <div>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4">
                                Historia Clínica
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PacientesEspera;