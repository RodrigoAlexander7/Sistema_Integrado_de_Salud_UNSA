import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BarraOpciones from "../../components/barra-opciones-enfermeria";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const TriajePaciente: React.FC = () => {
    const navigate = useNavigate(); 
    const handleInicioEnf = (e: React.FormEvent) => {
        e.preventDefault();
        setMostrarAlerta(true); 
        setTimeout(() => {
            setMostrarAlerta(false);
            navigate("/Inicio-Enfermeria"); 
        }, 3000);
    };
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
    const especialidades = [
        "Medicina General",
        "Trabajo Social",
        "Odontología",
        "Psicología",
        "Oftalmología"
    ];
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    return (
        <div className="w-full min-h-screen bg-white px-4 py-8 flex flex-col items-center">
            {mostrarAlerta && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-800 px-6 py-3 rounded shadow-md transition-opacity duration-500">
                    Guardado exitosamente
                </div>
            )}

            <BarraOpciones />
            <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg p-4">
                <h1 className="text-4xl font-bold text-center mt-8 mb-8 text-blue-950">
                    Triaje del Paciente
                </h1>
            </Card>

            <div className="border-2 border-blue-400 p-6 rounded-md w-full max-w-5xl shadow-sm">
                <h2 className="text-xl font-semibold text-center mb-6">
                    Ingreso de Datos Clínicos del Paciente
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Fila 0 */}
                    
                    <div>
                        <Label>Nombre:</Label>
                        <Input type="text" step="0.1" placeholder="nombre del paciente" />
                    </div>
                    <div>
                        <Label>CUI:</Label>
                        <Input type="number" placeholder="Cui del Paciente" />
                    </div>

                    {/* Fila 1 */}
                    
                    <div>
                        <Label>Temperatura corporal (°C):</Label>
                        <Input type="number" step="0.1" placeholder="Ej. 36.5" />
                    </div>
                    <div>
                        <Label>Presión arterial (mmHg):</Label>
                        <Input type="text" placeholder="Ej. 120/80" />
                    </div>

                    {/* Fila 2 */}
                    <div>
                        <Label>Frecuencia cardíaca (lpm):</Label>
                        <Input type="number" placeholder="Ej. 75" />
                    </div>
                    <div>
                        <Label>Frecuencia respiratoria (rpm):</Label>
                        <Input type="number" placeholder="Ej. 18" />
                    </div>

                    {/* Fila 3 */}
                    <div>
                        <Label>Saturación de oxígeno (%):</Label>
                        <Input type="number" placeholder="Ej. 98" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Peso (kg):</Label>
                            <Input type="number" step="0.1" placeholder="Ej. 70.5" />
                        </div>
                        <div>
                            <Label>Talla (cm):</Label>
                            <Input type="number" placeholder="Ej. 170" />
                        </div>
                    </div>

                    {/* Fila 4 */}
                    <div className="col-span-2">
                        <Label>Motivo de la consulta:</Label>
                        <Input type="text"
                            placeholder="Ej. Dolor abdominal, revisión médica..."
                        />
                    </div>

                    <div className="col-span-2">
                        <Label>Síntomas:</Label>
                        <Input type="text"
                            placeholder="Ej. Náuseas, fiebre, dolor persistente..."
                        />
                    </div>
                    {/* Fila Especialidad con Dropdown */}
                    <div className="col-span-2">
                        <Label>Especialidad:</Label>
                        <select
                            value={especialidadSeleccionada}
                            onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="" disabled>Seleccione una especialidad</option>
                            {especialidades.map((esp) => (
                                <option key={esp} value={esp}>
                                    {esp}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>

                {/* Botón */}
                <div className="mt-6 flex justify-center">
                    <Button className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-2 rounded-lg" onClick={handleInicioEnf}>
                        Guardar Triaje
                    </Button>
                    
                </div>
            </div>
        </div>
    );
};

export default TriajePaciente;
