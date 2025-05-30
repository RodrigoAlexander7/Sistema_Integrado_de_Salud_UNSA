import React from "react";
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faUserPlus,
    faUserCheck,
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
        navigate("/frontend/src/pages/Perfil.tsx"); 
    };
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
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#1c398e" }} />
            </Button>
            </div>
        </div>

        <nav className="flex items-center gap-5 w-full md:w-auto justify-end">
            
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
            
                <Tooltip>
                    <TooltipTrigger><FontAwesomeIcon icon={faHouse} style={{ color: "#1c398e" }} /></TooltipTrigger>
                    <TooltipContent>
                        <p>Inicio</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
            
                <Tooltip>
                    <TooltipTrigger><FontAwesomeIcon icon={faFileLines} style={{ color: "#1c398e" }} /></TooltipTrigger>
                    <TooltipContent>
                        <p>Reporte</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
            
                <Tooltip>
                    <TooltipTrigger><FontAwesomeIcon icon={faUserCheck} style={{ color: "#1c398e" }} /></TooltipTrigger>
                    <TooltipContent>
                        <p>Episodio</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
            
                <Tooltip>
                    <TooltipTrigger><FontAwesomeIcon icon={faUserPlus} style={{ color: "#1c398e" }} /></TooltipTrigger>
                    <TooltipContent >
                        <p>Nuevo</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200" onClick={handlePerfil}>
                
                <Tooltip>
                    <TooltipTrigger><FontAwesomeIcon icon={faCircleUser} className="h-6 w-6"style={{ color: "#1c398e" }}/></TooltipTrigger>
                    <TooltipContent >
                        <p>Perfil</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
            
            
=======
import { Home, FileText, Layers, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BarraOpciones: React.FC = () => {
    return (
        <header className="flex items-center justify-between bg-white shadow px-4 py-2 md:px-8">
        <div className="flex items-center gap-4">
            <img
            src="/frontend/src/assets/LOGO_UNSA.png" 
            alt="Logo UNSA"
            className="h-10"
            />
            <Input
            type="text"
            placeholder="Buscar por Código Universitario"
            className="w-60 md:w-96"
            />
        </div>

        <nav className="flex items-center gap-6">
            <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
            <FileText className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
            <Layers className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
            </Button>

            <img
            src="/frontend/src/assets/user_icon.png" 
            alt="Perfil"
            className="h-8 w-8 rounded-full object-cover"
            />
>>>>>>> 9ef602bc127159a608b6db3113d911e72ed45397
        </nav>
        </header>
    );
};

export default BarraOpciones;
