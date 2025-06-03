import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BarraOpciones from "../../components/barra-opciones";
import {
    
    faUserPlus,
    faUserCheck,
    faFileLines,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const InicioEnf: React.FC = () => {
    
    const navigate = useNavigate(); 

    const handleHistoriaClinicaIngreso = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("abriendo Historia Clinica Ingreso") 
        navigate("/HistoriaClinica-Ingreso");
    } 
    const handleTriajePacientesExistentes = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("abriendo triaje de pacientes") 
        navigate("/Triaje-Pacientes");
    } 
    return (
        <div className="w-full min-h-screen bg-white">
            <BarraOpciones />

            {/* Contenido principal */}
            <main className="flex flex-col items-center mt-12 px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                    Bienvenido/a Veronika Elizabeth, Rios Cuadros
                </h1>
                <p className="text-lg text-gray-700 mb-10">¿Qué acción deseas realizar?</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
                    {/* Card 1 */}
                    <Card className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer">
                        <CardContent className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#1c398e", scale: 4}} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Buscar un <br />Historial</p>
                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer">
                        <CardContent className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faFileLines} style={{ color: "#1c398e", scale: 3.5}} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Generar un Reporte</p>
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer">
                        <CardContent className="flex flex-col items-center" onClick={handleHistoriaClinicaIngreso}>
                            <FontAwesomeIcon icon={faUserPlus} style={{ color: "#1c398e", scale: 3.5 }} />
                            <p className="text-md font-medium text-blue-950"><br /><br /><br />Nueva Historia</p>
                        </CardContent>
                    </Card>

                    {/* Card 4 */}
                    <Card className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer">
                        <CardContent className="flex flex-col items-center" onClick={handleTriajePacientesExistentes}>
                            <FontAwesomeIcon icon={faUserCheck} style={{ color: "#1c398e", scale: 3.5 }} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Nuevo Episodio Clínico</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default InicioEnf;
