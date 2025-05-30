import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BarraOpciones from "../components/Barra-opciones";

const ConfiguracionUsuario: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-gray-50">
        <BarraOpciones />

        <main className="mt-20 px-6 md:px-12 py-6 flex flex-col gap-6 items-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-4 self-start">Configuraciones de usuario</h1>

            {/* Información Personal */}
            <Card className="w-full max-w-4xl shadow-md">
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Información Personal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                <div><span className="font-medium">Nombre:</span> Veronika Elizabeth, Rios Cuadros</div>
                <div><span className="font-medium">Especialidad:</span> Odontología</div>
                <div><span className="font-medium">Correo:</span> vrioscua@unsa.edu.pe</div>
                <div><span className="font-medium">Sede:</span> Ingenierías</div>
                </div>
            </CardContent>
            </Card>

            {/* Cambiar Contraseña */}
            <Card className="w-full max-w-4xl shadow-md">
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Cambiar Contraseña</h2>
                <div className="flex flex-col gap-4">
                <div>
                    <label className="block font-medium">Contraseña Antigua:</label>
                    <Input type="password" value="xxxxxxxxxxxxxxxxxx" readOnly />
                </div>
                <div>
                    <label className="block font-medium">Nueva Contraseña:</label>
                    <Input type="password" value="xxxxxxxxxxxx" readOnly />
                </div>
                <div>
                    <label className="block font-medium">Confirmar Nueva Contraseña:</label>
                    <Input type="password" value="xxxxxxxxxxxxxxxxxx" readOnly />
                </div>
                <Button className="w-fit self-center mt-2">Cambiar Contraseña</Button>
                </div>
            </CardContent>
            </Card>

            {/* Preferencias de Sistema */}
            <Card className="w-full max-w-4xl shadow-md">
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Preferencias de Sistema:</h2>
                <div className="flex justify-center">
                <Input className="w-32 text-center" value="Claro" readOnly />
                </div>
            </CardContent>
            </Card>
        </main>
        </div>
    );
};

export default ConfiguracionUsuario;
