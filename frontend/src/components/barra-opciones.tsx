import React from "react";
import { Home, FileText, Layers, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BarraOpciones: React.FC = () => {
    return (
        <header className="flex items-center justify-between bg-white shadow px-4 py-2 md:px-8">
        <div className="flex items-center gap-4">
            <img
            src="/LOGO_UNSA.png" 
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
            src="/user_icon.png"
            alt="Perfil"
            className="h-8 w-8 rounded-full object-cover"
            />
        </nav>
        </header>
    );
};

export default BarraOpciones;