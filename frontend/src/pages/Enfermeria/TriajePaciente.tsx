import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Thermometer, HeartPulse, Activity, Scale, Stethoscope, User } from "lucide-react";
import TitleCard from "@/components/TitleCard";

const TriajePaciente: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [historiaClinicaId, setHistoriaClinicaId] = useState<string>("");
    const [pacienteInfo, setPacienteInfo] = useState<{
        nombres: string;
        apellidos: string;
    } | null>(null);
    
    const [formData, setFormData] = useState({
        motivoConsulta: "",
        sintomas: "",
        presionArterial: "",
        temperatura: "",
        frecuenciaCardiaca: "",
        frecuenciaRespiratoria: "",
        saturacionOxigeno: "",
        peso: "",
        altura: "",
    });

    const [imc, setImc] = useState<number | null>(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPaciente, setIsLoadingPaciente] = useState(false);
    const [modoManual, setModoManual] = useState(false);

    // Obtener historiaClinicaId del estado de navegación o parámetros
    useEffect(() => {
        if (location.state?.historiaClinicaId) {
            setHistoriaClinicaId(location.state.historiaClinicaId);
            cargarPaciente(location.state.historiaClinicaId);
        }
    }, [location]);

    // Calcular IMC
    useEffect(() => {
        if (formData.peso && formData.altura) {
            const pesoNum = parseFloat(formData.peso);
            const alturaNum = parseFloat(formData.altura);
            if (alturaNum > 0) {
                const calculatedImc = pesoNum / (alturaNum * alturaNum);
                setImc(parseFloat(calculatedImc.toFixed(2)));
            }
        } else {
            setImc(null);
        }
    }, [formData.peso, formData.altura]);

    const cargarPaciente = async (id: string) => {
        setIsLoadingPaciente(true);
        try {
            const response = await fetch(`http://localhost:4000/api/historias-clinicas/${id}/paciente`, {
                credentials: "include"
            });
            
            if (!response.ok) {
                throw new Error("No se pudo cargar la información del paciente");
            }
            
            const data = await response.json();
            setPacienteInfo({
                nombres: data.nombres,
                apellidos: data.apellidos
            });
        } catch (error) {
            console.error("Error al cargar paciente:", error);
            setError("No se pudo verificar el ID de historia clínica");
            setModoManual(true);
        } finally {
            setIsLoadingPaciente(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHistoriaClinicaId(e.target.value);
        setPacienteInfo(null);
    };

    const verificarId = async () => {
        if (!historiaClinicaId) {
            setError("Por favor ingrese un ID de historia clínica");
            return;
        }

        setIsLoadingPaciente(true);
        setError("");
        try {
            await cargarPaciente(historiaClinicaId);
            setModoManual(false);
        } catch (error) {
            console.error("Error al verificar ID:", error);
            setError("ID de historia clínica no válido");
        } finally {
            setIsLoadingPaciente(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!historiaClinicaId || !pacienteInfo) {
            setError("Debe verificar el ID de historia clínica primero");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Crear el episodio clínico
            const episodioResponse = await fetch("http://localhost:4000/api/episodios-clinicos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    historiaClinicaId: parseInt(historiaClinicaId),
                    especialidadId: 1, // Temporal
                    enfermeraId: 1, // Debería venir de la sesión
                    consultorioId: 1, // Temporal
                    fechaEpisodio: new Date().toISOString(),
                    motivoConsulta: formData.motivoConsulta,
                    sintomas: formData.sintomas || null,
                    tratamiento: null,
                    observaciones: null,
                    medicoId: null
                })
            });

            if (!episodioResponse.ok) {
                throw new Error("Error al crear el episodio clínico");
            }

            const episodioData = await episodioResponse.json();
            const nuevoEpisodioId = episodioData.id;

            // 2. Registrar los signos vitales (solo si hay datos)
            if (formData.presionArterial || formData.temperatura || formData.frecuenciaCardiaca) {
                const signosVitalesData = {
                    episodioClinicoId: nuevoEpisodioId,
                    presionArterial: formData.presionArterial || null,
                    temperatura: formData.temperatura ? parseFloat(formData.temperatura) : null,
                    frecuenciaCardiaca: formData.frecuenciaCardiaca ? parseInt(formData.frecuenciaCardiaca) : null,
                    frecuenciaRespiratoria: formData.frecuenciaRespiratoria ? parseInt(formData.frecuenciaRespiratoria) : null,
                    saturacionOxigeno: formData.saturacionOxigeno ? parseFloat(formData.saturacionOxigeno) : null,
                    peso: formData.peso ? parseFloat(formData.peso) : null,
                    altura: formData.altura ? parseFloat(formData.altura) : null,
                    imc: imc || null
                };

                const signosResponse = await fetch("http://localhost:4000/api/signos-vitales", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(signosVitalesData)
                });

                if (!signosResponse.ok) {
                    throw new Error("Error al registrar los signos vitales");
                }
            }

            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
                navigate(`/episodio/${nuevoEpisodioId}`);
            }, 3000);

        } catch (err) {
            console.error("Error:", err);
            setError(err instanceof Error ? err.message : "Ocurrió un error desconocido");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-white px-4 py-8 flex flex-col items-center">
            {mostrarAlerta && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-800 px-6 py-3 rounded shadow-md transition-opacity duration-500">
                    Episodio clínico creado exitosamente
                </div>
            )}

            {error && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-800 px-6 py-3 rounded shadow-md">
                    {error}
                </div>
            )}

            <TitleCard 
                title="Nuevo Episodio Clínico" 
                icon={<Stethoscope className="h-8 w-8" />} 
            />

            <div className="border-2 border-blue-400 p-6 rounded-md w-full max-w-3xl shadow-sm">
                {/* Sección de ID de Historia Clínica */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-center mb-4">
                        {modoManual ? "Ingresar ID Manualmente" : "Verificación de Paciente"}
                    </h2>

                    {!modoManual && pacienteInfo ? (
                        <div className="border border-gray-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center mb-2">
                                <User className="h-5 w-5 mr-2 text-gray-500" />
                                <h3 className="font-medium">Paciente Verificado</h3>
                            </div>
                            <p><span className="font-semibold">Nombre:</span> {pacienteInfo.nombres} {pacienteInfo.apellidos}</p>
                            <p><span className="font-semibold">ID Historia Clínica:</span> {historiaClinicaId}</p>
                            <Button 
                                variant="link"
                                className="text-blue-600 mt-2 p-0 h-auto"
                                onClick={() => setModoManual(true)}
                            >
                                Cambiar paciente
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
                            <div className="flex-1 w-full">
                                <Label>ID de Historia Clínica:</Label>
                                <Input
                                    type="text"
                                    value={historiaClinicaId}
                                    onChange={handleIdChange}
                                    placeholder="Ingrese el ID de historia clínica"
                                />
                            </div>
                            <Button 
                                onClick={verificarId}
                                disabled={isLoadingPaciente || !historiaClinicaId}
                            >
                                {isLoadingPaciente ? "Verificando..." : "Verificar"}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Formulario principal */}
                {(!modoManual && pacienteInfo) && (
                    <>
                        <h2 className="text-xl font-semibold text-center mb-6">
                            Ingreso de Datos Iniciales
                        </h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4">
                            {/* Motivo de consulta y síntomas */}
                            <div>
                                <Label>Motivo de la consulta:</Label>
                                <Input
                                    type="text"
                                    name="motivoConsulta"
                                    value={formData.motivoConsulta}
                                    onChange={handleChange}
                                    placeholder="Describa el motivo principal de la consulta"
                                    required
                                />
                            </div>
                            
                            <div>
                                <Label>Síntomas:</Label>
                                <textarea
                                    name="sintomas"
                                    value={formData.sintomas}
                                    onChange={handleChange}
                                    placeholder="Describa los síntomas que presenta el paciente"
                                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>

                            <h3 className="text-lg font-medium mt-4 flex items-center">
                                <Activity className="h-5 w-5 mr-2" />
                                Signos Vitales (Opcional)
                            </h3>

                            {/* Resto del formulario de signos vitales... */}
                            {/* ... (mantener igual que en la versión anterior) ... */}

                            <div className="mt-6 flex justify-center">
                                <Button 
                                    type="submit" 
                                    className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-2 rounded-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Creando episodio..." : "Crear Episodio Clínico"}
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default TriajePaciente;