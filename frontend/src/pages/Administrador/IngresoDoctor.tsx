import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { User, FileText, Phone, Mail } from "lucide-react";
import TitleCard from "@/components/TitleCard";

const IngresoDoctor: React.FC = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        tipoDocumento: "DNI",
        numDocumento: "",
        nombres: "",
        apellidos: "",
        numLicencia: "",
        telefono: "",
        correo: "",
        activo: true
    });

    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos al backend
        console.log(formData);
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
            navigate("/inicio-admin"); 
        }, 3000);
    };

    const tiposDocumento = ["DNI", "Carnet de Extranjería", "Pasaporte"];

    return (
        <div className="w-full min-h-screen bg-white px-4 py-8 flex flex-col items-center">
            {mostrarAlerta && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-800 px-6 py-3 rounded shadow-md transition-opacity duration-500">
                    Médico registrado exitosamente
                </div>
            )}

            <TitleCard 
                title="Registro de Médico" 
                icon={<User className="h-8 w-8" />} 
            />

            <div className="border-2 border-blue-400 p-6 rounded-md w-full max-w-4xl shadow-sm">
                <h2 className="text-xl font-semibold text-center mb-6">
                    Datos del Médico
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Tipo y Número de Documento */}
                    <div>
                        <Label>Tipo de Documento:</Label>
                        <select
                            name="tipoDocumento"
                            value={formData.tipoDocumento}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {tiposDocumento.map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label>Número de Documento:</Label>
                        <Input 
                            type="text" 
                            name="numDocumento"
                            value={formData.numDocumento}
                            onChange={handleChange}
                            placeholder="Ej. 12345678" 
                        />
                    </div>

                    {/* Nombres y Apellidos */}
                    <div>
                        <Label>Nombres:</Label>
                        <Input 
                            type="text" 
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            placeholder="Nombres del médico" 
                        />
                    </div>
                    <div>
                        <Label>Apellidos:</Label>
                        <Input 
                            type="text" 
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            placeholder="Apellidos del médico" 
                        />
                    </div>

                    {/* Número de Licencia */}
                    <div className="col-span-2">
                        <Label>Número de Licencia Médica:</Label>
                        <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-gray-500" />
                            <Input 
                                type="text" 
                                name="numLicencia"
                                value={formData.numLicencia}
                                onChange={handleChange}
                                placeholder="Número de licencia profesional" 
                            />
                        </div>
                    </div>

                    {/* Contacto */}
                    <div>
                        <Label>Teléfono:</Label>
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-2 text-gray-500" />
                            <Input 
                                type="tel" 
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="Ej. 987654321" 
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Correo Electrónico:</Label>
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-gray-500" />
                            <Input 
                                type="email" 
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                placeholder="Ej. medico@ejemplo.com" 
                            />
                        </div>
                    </div>

                    {/* Estado */}
                    <div className="col-span-2 flex items-center">
                        <input
                            type="checkbox"
                            id="activo"
                            name="activo"
                            checked={formData.activo}
                            onChange={(e) => setFormData({...formData, activo: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <Label htmlFor="activo" className="ml-2">
                            Médico activo
                        </Label>
                    </div>

                    {/* Botones */}
                    <div className="col-span-2 mt-6 flex justify-center gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="text-blue-900 border-blue-900 hover:bg-blue-50"
                            onClick={() => navigate("/inicio-admin")}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-2 rounded-lg"
                        >
                            Registrar Médico
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IngresoDoctor;