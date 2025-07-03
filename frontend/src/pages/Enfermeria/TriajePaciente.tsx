import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router-dom";
import { File } from "lucide-react";
import TitleCard from "@/components/TitleCard";
import { toast } from "sonner"; // o cualquier otra librería de notificaciones

interface TriajeFormData {
    nombre: string;
    cui: string;
    temperatura: string;
    presionArterial: string;
    frecuenciaCardiaca: string;
    frecuenciaRespiratoria: string;
    saturacionOxigeno: string;
    peso: string;
    talla: string;
    motivoConsulta: string;
    sintomas: string;
    especialidad: string;
}

const especialidades = [
    "Medicina General",
    "Trabajo Social",
    "Odontología",
    "Psicología",
    "Oftalmología",
    "Nutrición"
];

const TriajePaciente: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pacienteDesdeEstado = location.state?.paciente;
    
    const [formData, setFormData] = useState<TriajeFormData>({
        nombre: pacienteDesdeEstado?.nombre || "",
        cui: pacienteDesdeEstado?.cui || "",
        temperatura: "",
        presionArterial: "",
        frecuenciaCardiaca: "",
        frecuenciaRespiratoria: "",
        saturacionOxigeno: "",
        peso: "",
        talla: "",
        motivoConsulta: "",
        sintomas: "",
        especialidad: ""
    });

    const [errors, setErrors] = useState<Partial<TriajeFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error cuando el usuario escribe
        if (errors[name as keyof TriajeFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<TriajeFormData> = {};
        
        if (!formData.nombre.trim()) newErrors.nombre = "Nombre es requerido";
        if (!formData.cui.trim()) newErrors.cui = "CUI es requerido";
        if (!formData.temperatura.trim()) newErrors.temperatura = "Temperatura es requerida";
        if (!formData.presionArterial.trim()) newErrors.presionArterial = "Presión arterial es requerida";
        if (!formData.motivoConsulta.trim()) newErrors.motivoConsulta = "Motivo de consulta es requerido";
        if (!formData.especialidad.trim()) newErrors.especialidad = "Especialidad es requerida";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Por favor complete todos los campos requeridos");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch('https://tu-api.com/triaje', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    pacienteId: pacienteDesdeEstado?.id || null,
                    fecha: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el triaje');
            }

            const data = await response.json();
            
            toast.success("Triaje guardado exitosamente");
            
            setTimeout(() => {
                navigate("/Inicio-Enfermeria", {
                    state: { triajeGuardado: true }
                });
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
            toast.error("Error al guardar el triaje. Por favor intente nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-white px-4 py-8 flex flex-col items-center">
            <TitleCard 
                title="Triaje de paciente" 
                icon={<File className="h-8 w-8" />} 
            />

            <div className="border-2 border-blue-400 p-6 rounded-md w-full max-w-5xl shadow-sm">
                <h2 className="text-xl font-semibold text-center mb-6">
                    Ingreso de Datos Clínicos del Paciente
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Fila 0 */}
                    <div>
                        <Label>Nombre:</Label>
                        <Input 
                            type="text" 
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre del paciente"
                            disabled={!!pacienteDesdeEstado}
                        />
                        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                    </div>
                    <div>
                        <Label>CUI:</Label>
                        <Input 
                            type="text" 
                            name="cui"
                            value={formData.cui}
                            onChange={handleChange}
                            placeholder="CUI del Paciente"
                            disabled={!!pacienteDesdeEstado}
                        />
                        {errors.cui && <p className="text-red-500 text-sm mt-1">{errors.cui}</p>}
                    </div>

                    {/* Fila 1 */}
                    <div>
                        <Label>Temperatura corporal (°C):</Label>
                        <Input 
                            type="number" 
                            name="temperatura"
                            value={formData.temperatura}
                            onChange={handleChange}
                            step="0.1" 
                            placeholder="Ej. 36.5" 
                        />
                        {errors.temperatura && <p className="text-red-500 text-sm mt-1">{errors.temperatura}</p>}
                    </div>
                    <div>
                        <Label>Presión arterial (mmHg):</Label>
                        <Input 
                            type="text" 
                            name="presionArterial"
                            value={formData.presionArterial}
                            onChange={handleChange}
                            placeholder="Ej. 120/80" 
                        />
                        {errors.presionArterial && <p className="text-red-500 text-sm mt-1">{errors.presionArterial}</p>}
                    </div>

                    {/* Fila 2 */}
                    <div>
                        <Label>Frecuencia cardíaca (lpm):</Label>
                        <Input 
                            type="number" 
                            name="frecuenciaCardiaca"
                            value={formData.frecuenciaCardiaca}
                            onChange={handleChange}
                            placeholder="Ej. 75" 
                        />
                    </div>
                    <div>
                        <Label>Frecuencia respiratoria (rpm):</Label>
                        <Input 
                            type="number" 
                            name="frecuenciaRespiratoria"
                            value={formData.frecuenciaRespiratoria}
                            onChange={handleChange}
                            placeholder="Ej. 18" 
                        />
                    </div>

                    {/* Fila 3 */}
                    <div>
                        <Label>Saturación de oxígeno (%):</Label>
                        <Input 
                            type="number" 
                            name="saturacionOxigeno"
                            value={formData.saturacionOxigeno}
                            onChange={handleChange}
                            placeholder="Ej. 98" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Peso (kg):</Label>
                            <Input 
                                type="number" 
                                name="peso"
                                value={formData.peso}
                                onChange={handleChange}
                                step="0.1" 
                                placeholder="Ej. 70.5" 
                            />
                        </div>
                        <div>
                            <Label>Talla (cm):</Label>
                            <Input 
                                type="number" 
                                name="talla"
                                value={formData.talla}
                                onChange={handleChange}
                                placeholder="Ej. 170" 
                            />
                        </div>
                    </div>

                    {/* Fila 4 */}
                    <div className="col-span-2">
                        <Label>Motivo de la consulta:</Label>
                        <Input 
                            type="text"
                            name="motivoConsulta"
                            value={formData.motivoConsulta}
                            onChange={handleChange}
                            placeholder="Ej. Dolor abdominal, revisión médica..."
                        />
                        {errors.motivoConsulta && <p className="text-red-500 text-sm mt-1">{errors.motivoConsulta}</p>}
                    </div>

                    <div className="col-span-2">
                        <Label>Síntomas:</Label>
                        <Input 
                            type="text"
                            name="sintomas"
                            value={formData.sintomas}
                            onChange={handleChange}
                            placeholder="Ej. Náuseas, fiebre, dolor persistente..."
                        />
                    </div>

                    {/* Fila Especialidad con Dropdown */}
                    <div className="col-span-2">
                        <Label>Especialidad:</Label>
                        <select
                            name="especialidad"
                            value={formData.especialidad}
                            onChange={handleChange}
                            className={`w-full mt-1 p-2 border ${errors.especialidad ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        >
                            <option value="" disabled>Seleccione una especialidad</option>
                            {especialidades.map((esp) => (
                                <option key={esp} value={esp}>
                                    {esp}
                                </option>
                            ))}
                        </select>
                        {errors.especialidad && <p className="text-red-500 text-sm mt-1">{errors.especialidad}</p>}
                    </div>

                    {/* Botón */}
                    <div className="col-span-2 mt-6 flex justify-center">
                        <Button 
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-2 rounded-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Guardando..." : "Guardar Triaje"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TriajePaciente;
