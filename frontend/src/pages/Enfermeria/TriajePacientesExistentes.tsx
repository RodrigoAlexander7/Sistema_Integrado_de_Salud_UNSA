import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import BarraOpciones from "../../components/barra-opciones-enfermeria";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";
interface Paciente {
    nombre: string;
    motivo: string;
    sintomas: string;
    especialidad: string;
}

const opcionesUrgencia = ["Estandar", "Prioridad", "Urgencia"];
const opcionesEspecialidad = ["Nutrición", "Psicología", "T. Social"];
const TriajePacientesExistentes: React.FC = () => {

    const pacientes: Paciente[] = [
        { nombre: "Leonel Messi", motivo: "Dolor abdominal", sintomas: "Náuseas y vómitos", especialidad: "Psicología, T. Social"},
        { nombre: "Fernando Alonso", motivo: "Tos persistente", sintomas: "Dificultad para respirar leve", especialidad: "Psicología, T. Social" },
        { nombre: "Juan Perez", motivo: "Ansiedad", sintomas: "Problemas para dormir", especialidad: "Psicología, T. Social" },
    ];

    const [urgenciasSeleccionadas, setUrgenciasSeleccionadas] = useState<string[]>(Array(pacientes.length).fill(""));
    const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState<string[][]>(
        Array(pacientes.length).fill([]).map(() => [])
    );  

    const toggleUrgencia = (index: number, value: string) => {
        const nuevas = [...urgenciasSeleccionadas];
        nuevas[index] = value;
        setUrgenciasSeleccionadas(nuevas);
    };

    const toggleEspecialidad = (index: number, value: string) => {
        const nuevas = [...especialidadesSeleccionadas];
        if (nuevas[index].includes(value)) {
        nuevas[index] = nuevas[index].filter((v) => v !== value);
        } else {
        nuevas[index] = [...nuevas[index], value];
        }
        setEspecialidadesSeleccionadas(nuevas);
    };
    const navigate = useNavigate();
    const handlePacientesEspera = (e: React.FormEvent) => {
            e.preventDefault();
            console.log("abriendo lista de pacientes de espera") 
            navigate("/pacientesEspera"); 
        };
    return (
        
        <div className="w-full min-h-screen bg-white px-6 py-8">
            <BarraOpciones />
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Pacientes existentes</h1>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Input placeholder="Buscar por Nombre de paciente" className="max-w-md" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#1c398e" }} />
                </div>
                
            </div>

            {/* Tabla de pacientes */}
            <div className="w-full border rounded-lg overflow-hidden shadow-sm">
                <div className="grid grid-cols-5 bg-gray-100 px-4 py-2 font-medium text-sm text-gray-700">
                    <div>Nombre</div>
                    <div>Motivo de consulta</div>
                    <div>Síntomas</div>
                    <div>Urgencia</div>
                    <div>Especialidades</div>
                    <div></div>
                </div>

                {pacientes.map((paciente, index) => (
                    <div key={index} className="grid grid-cols-5 px-4 py-3 border-t items-center">
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

                        {/* Dropdown Especialidades */}
                        <div>
                            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-44 justify-between">
                    {especialidadesSeleccionadas[index].length > 0
                        ? especialidadesSeleccionadas[index].join(", ")
                        : "Seleccionar"}{" "}
                    <FaChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44">
                    {opcionesEspecialidad.map((e) => (
                    <DropdownMenuCheckboxItem
                        key={e}
                        checked={especialidadesSeleccionadas[index].includes(e)}
                        onCheckedChange={() => toggleEspecialidad(index, e)}
                    >
                        {e}
                    </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
                </DropdownMenu>
                        </div>
                    </div>
                ))}

                {/* Botón al final */}
                <div className="px-4 py-4 border-t flex justify-start space-x-4">
                    <Button className="bg-blue-500 hover:bg-blue-600 hover:scale-105 xt-white px-6">
                        Añadir nuevo episodio clínico
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white px-6" onClick={handlePacientesEspera}>
                        Pacientes en espera
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default  TriajePacientesExistentes;
