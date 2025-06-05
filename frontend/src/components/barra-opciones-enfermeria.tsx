import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faBell,
    faFileLines,
    faHouse,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const BarraOpciones: React.FC = () => {

    const navigate = useNavigate(); 

    const handlePerfil = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("abriendo Perfil") 
        navigate("/perfil"); 
    };
    
    const handlePacientesEnEspera = (e: React.FormEvent) => {
            e.preventDefault();
            console.log("abriendo pacientes en espera") 
            navigate("/pacientesEspera");
    }
    const handleInicioEnf = (e: React.FormEvent) => {
            e.preventDefault();
            navigate("/Inicio-Enfermeria");
    } 
    return (
        <header className="w-full bg-white shadow-md px-4 py-3 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
            <img src="/LOGO_UNSA.png" alt="Logo UNSA" className="h-10" />

            <div className="flex flex-1 items-center gap-2">
            <Input
                type="text"
                placeholder="Buscar por Código Universitario"
                className="pl-4 pr-10 py-2 w-64 border rounded-md"
            />
            <Button variant="ghost" size="icon" className="scale-200 hover:scale-220 transition-transform duration-200">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#1c398e" }} />
            </Button>
            </div>
        </div>

        <nav className="flex items-center gap-5 w-full md:w-auto justify-end">
            
            <Button variant="ghost" size="icon" className="scale-200 hover:scale-220 transition-transform duration-200" onClick={handleInicioEnf}>
            
                <Tooltip>
                    <TooltipTrigger><FontAwesomeIcon icon={faHouse} style={{ color: "#1c398e" }} /></TooltipTrigger>
                    <TooltipContent>
                        <p>Inicio</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
            <Button variant="ghost" size="icon" className="scale-200 hover:scale-220 transition-transform duration-200">
            
                <Tooltip>
                    <TooltipTrigger><FontAwesomeIcon icon={faFileLines} style={{ color: "#1c398e" }} /></TooltipTrigger>
                    <TooltipContent>
                        <p>Reporte</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
            <Button variant="ghost" size="icon" className=" scale-200 hover:scale-220 transition-transform duration-200" onClick={handlePacientesEnEspera}>
            
                <Tooltip>
                    <TooltipTrigger><FontAwesomeIcon icon={faBell} style={{color: "#1c398e"}} /></TooltipTrigger>
                    <TooltipContent>
                        <p>Pendientes</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
            
            <Button variant="ghost" size="icon" className="scale-200 hover:scale-220 transition-transform duration-200" onClick={handlePerfil}>
                
                <Tooltip>
                    <TooltipTrigger><FontAwesomeIcon icon={faCircleUser} className="h-6 w-6"style={{ color: "#1c398e" }}/></TooltipTrigger>
                    <TooltipContent >
                        <p>Perfil</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
            
            
        </nav>
        </header>
    );
};

export default BarraOpciones;