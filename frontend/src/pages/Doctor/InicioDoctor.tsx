import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    faUserCheck,
    faFileLines,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import TitleCard from "@/components/TitleCard";
import { UserPlus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const InicioDoc: React.FC = () => {
    const { theme } = useTheme();
    
    const navigate = useNavigate(); 

    const handleBusqueda = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/busqueda");
    }
    const handlePacientesPendientes = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/pacientes-pendientes");
    } 
        
    return (
        <div className="w-full"> 


            {/* Contenido principal */}
            <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
                <div className="w-full max-w-full">

                    <TitleCard 
                        title="Bienvenido/a" 
                        icon={<UserPlus className="h-8 w-8" />} 
                    />
                    
                    <p className={`text-lg text-center mb-10 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                        ¿Qué acción deseas realizar?
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                        {/* Card 1 */}
                        <Card onClick={handleBusqueda} className="flex flex-col items-center justify-center p-20 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                            <CardContent className="flex flex-col items-center">
                                <FontAwesomeIcon  
                                    icon={faMagnifyingGlass} 
                                    style={{ 
                                        color: theme === 'dark' ? "#ffffff" : "#1c398e", 
                                        scale: 3.5 
                                    }} 
                                />
                                <p className={`text-md font-medium   ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-blue-950'
                                }`}><br /><br />Búsqueda de<br />un paciente</p>
                            </CardContent>
                        </Card>

                        {/* Card 2 */}
                        <Card className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                            <CardContent className="flex flex-col items-center">
                                <FontAwesomeIcon  
                                    icon={faFileLines} 
                                    style={{ 
                                        color: theme === 'dark' ? "#ffffff" : "#1c398e", 
                                        scale: 3.5 
                                    }} 
                                />
                                <p className={`text-md font-medium   ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-blue-950'
                                }`}><br /><br />Generar un<br></br>Reporte</p>
                            </CardContent>
                        </Card>

                        {/* Card 3 */}
                        <Card onClick={handlePacientesPendientes} className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                            <CardContent className="flex flex-col items-center" >
                                <FontAwesomeIcon  
                                    icon={faUserCheck} 
                                    style={{ 
                                        color: theme === 'dark' ? "#ffffff" : "#1c398e", 
                                        scale: 3.5 
                                    }} 
                                />
                                <p className={`text-md font-medium   ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-blue-950'
                                }`}><br /><br />Pacientes<br></br>Nuevos</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InicioDoc;
