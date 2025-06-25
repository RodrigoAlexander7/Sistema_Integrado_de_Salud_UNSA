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
import TitleCard from "@/components/TitleCard";
import { UserPlus } from "lucide-react";

const InicioAdm: React.FC = () => {
    
    const navigate = useNavigate(); 

    const handleBusqueda = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/busqueda");
    }
    const handleNuevoDotor = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/ingresar-nuevo-doctor");
    }

    const handleNuevaEnfermera = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/ingresar-nueva-enfermera");
    } 
        
    return (
        <div className="w-full min-h-screen bg-white">


            {/* Contenido principal */}
            <main className="flex flex-col items-center mt-12 px-4">
                <TitleCard 
                    title="Bienvenido/a" 
                    icon={<UserPlus className="h-8 w-8" />} 
                />
                
                <p className="text-lg text-gray-700 mb-10">¿Qué acción deseas realizar?</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {/* Card 1 */}
                    <Card onClick={handleBusqueda} className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center">
                            <FontAwesomeIcon  icon={faMagnifyingGlass} style={{ color: "#1c398e", scale: 4}} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Búsqueda de personal</p>
                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card onClick={handleNuevoDotor} className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faFileLines} style={{ color: "#1c398e", scale: 3.5}} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Ingresar nuevo/a Doctor/a</p>
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card onClick={handleNuevaEnfermera} className="flex flex-col items-center justify-center p-6 text-center border-blue-200 hover:shadow-lg cursor-pointer hover:scale-110">
                        <CardContent className="flex flex-col items-center" >
                            <FontAwesomeIcon icon={faUserCheck} style={{ color: "#1c398e", scale: 3.5 }} />
                            <p className="text-md font-medium text-blue-950"><br /><br />Ingresar nuevo/a enfermero/a</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default InicioAdm;
