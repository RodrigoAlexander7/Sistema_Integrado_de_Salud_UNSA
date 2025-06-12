import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BarraOpciones from "../../components/barra-opciones-enfermeria";
import {
    
    faUserPlus,
    faUserCheck,
    faFileLines,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const InicioDoc: React.FC = () => {
    
    const navigate = useNavigate(); 

    const handleBusqueda = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/busqueda");
    }
    const handlePacientesPendientes = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/pacientes_pendientes");
    } 
        
    return (
        <div className="w-full min-h-screen bg-white">
            <BarraOpciones />

            {/* Contenido principal */}
            <main className="flex flex-col items-center mt-12 px-4">
                <Card 
                    className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg p-4"
                    >
                    <h1 className="text-4xl font-bold text-center mt-8 mb-8 text-blue-950">
                    Bienvenido/a Veronika Elizabeth, Rios Cuadros
                    </h1>
                </Card>
                
                <p className="text-lg text-gray-700 mb-10">¿Qué acción deseas realizar?</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {/* Card 1 */}
                    <Card onClick={handleBusqueda} className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center">
                            <FontAwesomeIcon  icon={faMagnifyingGlass} style={{ color: "#1c398e", scale: 4}} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Búsqueda de<br />un paciente</p>
                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faFileLines} style={{ color: "#1c398e", scale: 3.5}} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Generar un Reporte</p>
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card onClick={handlePacientesPendientes} className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center" >
                            <FontAwesomeIcon icon={faUserCheck} style={{ color: "#1c398e", scale: 3.5 }} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Pacientes<br></br>Pendientes</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default InicioDoc;
