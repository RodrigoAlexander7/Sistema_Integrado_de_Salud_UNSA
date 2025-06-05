import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BarraOpciones from "../../components/barra-opciones-enfermeria";


const HistoriaClinicaIngreso: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-white px-4 py-8 flex flex-col items-center">
            <BarraOpciones />

            <h1 className="text-3xl font-bold text-blue-900 mb-6">
                Historia Clínica de Ingreso
            </h1>

            {/* Contenedor del formulario */}
            <div className="border-2 border-blue-400 p-6 rounded-md w-full max-w-5xl shadow-sm">
                <h2 className="text-xl font-semibold text-center mb-6">
                    Ingreso de Información Personal del Paciente
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Fila 1 */}
                    <div>
                        <Label>Facultad y/o ESC. PROF:</Label>
                        <Input type="text" />
                    </div>
                    <div>
                        <Label>CUI:</Label>
                        <Input type="text" />
                    </div>

                    {/* Fila 2 */}
                    <div>
                        <Label>Apellidos y Nombres:</Label>
                        <Input type="text" />
                    </div>
                    <div>
                        <Label>DNI:</Label>
                        <Input type="text" />
                    </div>

                    {/* Fila 3 */}
                    <div>
                        <Label>Edad:</Label>
                        <Input type="number" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>Sexo:</Label>
                            <Input type="text" />
                        </div>
                        <div>
                            <Label>Estado Civil:</Label>
                            <Input type="text" />
                        </div>
                        <div>
                            <Label>Procedencia:</Label>
                            <Input type="text" />
                        </div>
                    </div>

                    {/* Fila 4 */}
                    <div className="col-span-2">
                        <Label>Domicilio:</Label>
                        <Input type="text" />
                    </div>

                    {/* Fila 5 */}
                    <div>
                        <Label>Teléfono:</Label>
                        <Input type="text" />
                    </div>
                    <div>
                        <Label>Correo Electrónico:</Label>
                        <Input type="email" />
                    </div>

                    {/* Fila 6 */}
                    <div>
                        <Label>Ocupación:</Label>
                        <Input type="text" />
                    </div>
                    <div>
                        <Label>Contacto de Emergencia:</Label>
                        <Input type="text" />
                    </div>

                    {/* Fila 7 - Fecha */}
                    <div className="col-span-2 flex flex-wrap gap-4 mt-2">
                        <div className="flex flex-col">
                            <Label>Fecha:</Label>
                            <div className="flex gap-2">
                                <Input type="number" placeholder="Día" className="w-24" />
                                <Input type="number" placeholder="Mes" className="w-24" />
                                <Input type="number" placeholder="Año" className="w-28" />
                            </div>
                        </div>
                    </div>
                </form>

                {/* Botón */}
                <div className="mt-6 flex justify-center">
                    <Button className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-2 rounded-lg">
                        Inscribir Paciente
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HistoriaClinicaIngreso;
