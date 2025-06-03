import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BarraOpciones from "../components/barra-opciones";

const Perfil: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
            <BarraOpciones />
            
            <h1 className="text-4xl font-bold text-center mt-8 mb-8 text-blue-950">
                Perfil de Usuario
            </h1>

            <div className="flex flex-col items-center gap-6 px-4 mb-12">
                {/* Información Personal */}
                <Card className="w-full max-w-4xl shadow-md border border-gray-300">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Información Personal</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm md:text-base">
                            <div><span className="font-medium">Nombre:</span> Veronika Elizabeth, Rios Cuadros</div>
                            <div><span className="font-medium">Especialidad:</span> Odontología</div>
                            <div><span className="font-medium">Correo:</span> vrioscua@unsa.edu.pe</div>
                            <div><span className="font-medium">Sede:</span> Ingenierías</div>
                        </div>
                    </CardContent>
                </Card>

                {/* Cambiar Contraseña */}
                <Card className="w-full max-w-4xl shadow-md border border-gray-300">
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

                {/* Preferencias del Sistema */}
                <Card className="w-full max-w-4xl shadow-md border border-gray-300">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Preferencias de Sistema</h2>
                        <div className="flex justify-center">
                            
                            <Button className="w-32 text-center">Claro</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Perfil;
