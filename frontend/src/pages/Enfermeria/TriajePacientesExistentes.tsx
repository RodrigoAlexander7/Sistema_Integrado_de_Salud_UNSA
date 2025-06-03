import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//import { Checkbox } from "@/components/ui/checkbox";
import { FaChevronDown } from "react-icons/fa";
import BarraOpciones from "../../components/barra-opciones";
import {
    DropdownMenu,
    DropdownMenuContent,
    //DropdownMenuItem,
    //DropdownMenuLabel,
    //DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";

const pacientes = [
    {
        nombre: "Leonel Messi",
        motivo: "Dolor abdominal",
        sintomas: "Náuseas y vómitos",
    },
    {
        nombre: "Fernando Alonso",
        motivo: "Tos persistente",
        sintomas: "Dificultad para respirar leve",
    },
    {
        nombre: "Juan Perez",
        motivo: "Ansiedad",
        sintomas: "Problemas para dormir",
    },
];

const opcionesUrgencia = ["Estandar", "Prioridad", "Urgencia"];
const opcionesEspecialidad = ["Nutrición", "Psicología", "T. Social"];

const TriajePacientesExistentes: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-white px-6 py-8">
            <BarraOpciones />
            {/* Título y barra de búsqueda */}
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
                </div>

                {pacientes.map((paciente, index) => (
                    <div key={index} className="grid grid-cols-5 px-4 py-3 border-t items-center">
                        <div>{paciente.nombre}</div>
                        <div>{paciente.motivo}</div>
                        <div>{paciente.sintomas}</div>

                        {/* Dropdown Urgencia */}
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="border rounded-md px-3 py-1 flex items-center justify-between w-full text-sm">
                                    <span className="truncate">Seleccionar</span>
                                    <FaChevronDown className="ml-2 text-xs" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-44 mt-2">
                                    {opcionesUrgencia.map((opcion) => (
                                        <DropdownMenuCheckboxItem key={opcion}>
                                            {opcion}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                    <div className="flex justify-between mt-2 px-2">
                                        <Button variant="ghost" size="sm">Clear</Button>
                                        <Button variant="default" size="sm">Ok</Button>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Dropdown Especialidades */}
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="border rounded-md px-3 py-1 flex items-center justify-between w-full text-sm">
                                    <span className="truncate">Seleccionar</span>
                                    <FaChevronDown className="ml-2 text-xs" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-44 mt-2">
                                    {opcionesEspecialidad.map((opcion) => (
                                        <DropdownMenuCheckboxItem key={opcion}>
                                            {opcion}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                    <div className="flex justify-between mt-2 px-2">
                                        <Button variant="ghost" size="sm">Clear</Button>
                                        <Button variant="default" size="sm">Ok</Button>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}

                {/* Botón al final */}
                <div className="px-4 py-4 border-t flex justify-start">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
                        Añadir nuevo episodio clínico
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default  TriajePacientesExistentes;
