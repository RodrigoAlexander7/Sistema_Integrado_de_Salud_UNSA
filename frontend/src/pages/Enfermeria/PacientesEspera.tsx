import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import BarraOpciones from "../../components/barra-opciones-enfermeria";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TitleCard from "@/components/TitleCard";
import { User, FileText, Phone, Mail } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Paciente {
    id: string;
    nombre: string;
    motivo: string;
    sintomas: string;
    especialidad: string;
    urgencia: string;
    cui?: string;
    dni?: string;
}

const opcionesUrgencia = ["Estandar", "Prioridad", "Urgencia"];

const PacientesEspera: React.FC = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [urgenciasSeleccionadas, setUrgenciasSeleccionadas] = useState<Record<string, string>>({});

    const navigate = useNavigate();

    // Obtener pacientes al cargar el componente
    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await fetch('https://tu-api.com/pacientes/en-espera');
                if (!response.ok) {
                    throw new Error('Error al obtener pacientes');
                }
                const data = await response.json();
                setPacientes(data);
                
                // Inicializar urgencias seleccionadas
                const iniciales = data.reduce((acc: Record<string, string>, paciente: Paciente) => {
                    acc[paciente.id] = paciente.urgencia;
                    return acc;
                }, {});
                setUrgenciasSeleccionadas(iniciales);
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchPacientes();
    }, []);

    // Filtrar pacientes según término de búsqueda
    const filteredPacientes = pacientes.filter(paciente =>
        paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleUrgencia = (id: string, value: string) => {
        setUrgenciasSeleccionadas(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const actualizarUrgencia = async (id: string) => {
        try {
            const response = await fetch(`https://tu-api.com/pacientes/${id}/urgencia`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    urgencia: urgenciasSeleccionadas[id]
                }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar urgencia');
            }

            // Actualizar estado local
            setPacientes(prev => prev.map(p => 
                p.id === id ? { ...p, urgencia: urgenciasSeleccionadas[id] } : p
            ));

        } catch (err) {
            console.error('Error al actualizar urgencia:', err);
            // Mostrar notificación de error al usuario
        }
    };

    const aceptarPaciente = async (paciente: Paciente) => {
        try {
            // 1. Actualizar estado del paciente a "en atención"
            const response = await fetch(`https://tu-api.com/pacientes/${paciente.id}/aceptar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado: 'en_atencion',
                    fechaAtencion: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error('Error al aceptar paciente');
            }

            // 2. Redirigir a la vista de atención
            navigate(`/atencion-paciente/${paciente.id}`, {
                state: { paciente }
            });

            // 3. Actualizar lista local (opcional)
            setPacientes(prev => prev.filter(p => p.id !== paciente.id));

        } catch (err) {
            console.error('Error al aceptar paciente:', err);
            // Mostrar notificación de error al usuario
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-white px-6 py-8 flex justify-center items-center">
                <p>Cargando pacientes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen bg-white px-6 py-8 flex justify-center items-center">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white px-6 py-8">
            <div className="mb-6">
                <TitleCard 
                    title="Pacientes en Espera" 
                    icon={<User className="h-8 w-8" />} 
                />
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Input 
                        placeholder="Buscar por Nombre de paciente" 
                        className="max-w-md" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                    <div></div>
                </div>

                {filteredPacientes.length === 0 ? (
                    <div className="px-4 py-6 text-center text-gray-500">
                        No hay pacientes en espera
                    </div>
                ) : (
                    filteredPacientes.map((paciente) => (
                        <div key={paciente.id} className="grid grid-cols-6 px-4 py-3 border-t items-center">
                            <div>
                                <p className="font-medium">{paciente.nombre}</p>
                                {paciente.dni && <p className="text-xs text-gray-500">DNI: {paciente.dni}</p>}
                            </div>
                            <div>{paciente.motivo}</div>
                            <div>{paciente.sintomas}</div>

                            {/* Dropdown Urgencia */}
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-36 justify-between">
                                            {urgenciasSeleccionadas[paciente.id] || "Seleccionar"} 
                                            <FaChevronDown className="ml-2 h-3 w-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-40">
                                        {opcionesUrgencia.map((u) => (
                                            <DropdownMenuCheckboxItem
                                                key={u}
                                                checked={urgenciasSeleccionadas[paciente.id] === u}
                                                onCheckedChange={() => {
                                                    toggleUrgencia(paciente.id, u);
                                                    actualizarUrgencia(paciente.id);
                                                }}
                                            >
                                                {u}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Especialidad mostrada directamente */}
                            <div className="text-sm text-gray-800">{paciente.especialidad}</div>

                            {/* Botón Aceptar */}
                            <div>
                                <Button 
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4"
                                    onClick={() => aceptarPaciente(paciente)}
                                >
                                    Aceptar
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PacientesEspera;