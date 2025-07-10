import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BarraOpciones from "../../components/barra-opciones-enfermeria";
import {
    
    faUserPlus,
    faUserCheck,
    faBell,
    faFileLines,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import TitleCard from "@/components/TitleCard";
import { File } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";1




const InicioEnf: React.FC = () => {
    const { theme } = useTheme();
    
    const navigate = useNavigate(); 

    const handleHistoriaClinicaIngreso = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("abriendo Historia Clinica Ingreso") 
        navigate("/ingreso-historia-clinica");
    } 
    const handlePacientesEnEspera = (e: React.FormEvent) => {
                e.preventDefault();
                console.log("abriendo pacientes en espera") 
                navigate("/pacientes-espera");
        }
    
    const handleTriaje = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("abriendo el triaje para el nuevo episodio médico") 
        navigate("/triaje");
    }
    const handleBusqueda = (e: React.FormEvent) => {
            e.preventDefault();
            navigate("/busqueda");
    }
        
    return (
        <div className="w-full min-h-screen bg-white">
            
            {/* Contenido principal */}
            <main className="flex flex-col items-center mt-12 px-4">
                <TitleCard 
                    title="Bienvenido/a" 
                    icon={<File className="h-8 w-8" />} 
                />
                
                <p className="text-lg text-gray-700 mb-10">¿Qué acción deseas realizar?</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 w-full max-w-5xl">
                    {/* Card 1 */}
                    <Card onClick={handleBusqueda} className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#1c398e", scale: 4}} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Buscar un <br />Historial</p>
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
                    <Card className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center" onClick={handleHistoriaClinicaIngreso}>
                            <FontAwesomeIcon icon={faUserPlus} style={{ color: "#1c398e", scale: 3.5 }} />
                            <p className="text-md font-medium text-blue-950"><br /><br /><br />Nueva Historia</p>
                        </CardContent>
                    </Card>

                    {/* Card 4 */}
                    <Card className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center" onClick={handleTriaje}>
                            <FontAwesomeIcon icon={faUserCheck} style={{ color: "#1c398e", scale: 3.5 }} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Nuevo Episodio Clínico</p>
                        </CardContent>
                    </Card>
                    {/* Card 5 */}
                    <Card className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center" onClick={handlePacientesEnEspera}>
                            <FontAwesomeIcon icon={faBell} style={{ color: "#1c398e", scale: 3.5 }}  />
                            <p className="text-md font-medium text-blue-950"><br /><br />Nuevo Episodio Clínico</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default InicioEnf;
