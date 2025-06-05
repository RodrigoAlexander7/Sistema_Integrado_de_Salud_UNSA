import React from "react";
import { Card } from "@/components/ui/card";

import FichaEstudiante from "../../components/FichaEstudiante";
import Seleccion_diagnostico from "../../components/diagnostico-primario-secundario";


const DiagnosticoOftalmologia = () => {
    return (
        <div className="min-h-screen bg-white text-gray-800 p-6 md:p-10 space-y-6">
        {/* Título */}
        <Card className="bg-gradient-to-br from-blue-200 via-blue-100 to-sky-100 shadow p-4">
            <h1 className="text-4xl font-bold text-center text-blue-950">OFTALMOLOGÍA</h1>
        </Card>
        <FichaEstudiante/>
        {/* Agudeza Visual */}
        <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Agudeza visual</h3>

            <div className="grid md:grid-cols-2 gap-6">
            {/* Sin corrección */}
            <div>
                <h4 className="font-semibold mb-2">Sin Corrección</h4>
                <div className="grid grid-cols-3 gap-2 text-sm text-center border rounded p-3">
                <span className="font-medium">Ojo</span>
                <span>Lejos</span>
                <span>Cerca</span>
                <span>OD</span>
                <span>20/20</span>
                <span>J1</span>
                <span>OI</span>
                <span>20/25</span>
                <span>J2</span>
                </div>
            </div>

            {/* Con corrección */}
            <div>
                <h4 className="font-semibold mb-2">Con Corrección</h4>
                <div className="grid grid-cols-4 gap-2 text-sm text-center border rounded p-3">
                <span className="font-medium col-span-1">Ojo</span>
                <span>Lejos</span>
                <span>Cerca</span>
                <span>Lentes Utilizados</span>
                <span>OD</span>
                <span>20/20</span>
                <span>J1</span>
                <span>-2.50 esf +0.50 cil x180º</span>
                <span>OI</span>
                <span>20/25</span>
                <span>J2</span>
                <span>-2.75 esf +0.75 cil x170º</span>
                </div>
            </div>
            </div>
        </Card>

        {/* Exámenes Oculares */}
        <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Exámenes Oculares</h3>

            {/* Refracción */}
            <div>
            <h4 className="font-semibold mb-2">Refracción</h4>
            <div className="grid grid-cols-6 gap-2 text-sm text-center border rounded p-3">
                <span>Ojo</span><span>Esfera</span><span>Cilindro</span><span>Eje</span><span>AV</span>
                <span></span> {/* empty for alignment */}
                <span>OD</span><span>-2.5</span><span>+0.50</span><span>180</span><span>20/20</span>
                <span>OI</span><span>-2.5</span><span>+0.50</span><span>180</span><span>20/20</span>
            </div>
            </div>

            {/* Presión Intraocular */}
            <div>
            <h4 className="font-semibold mb-2">Presión Intraocular</h4>
            <div className="grid grid-cols-5 gap-2 text-sm text-center border rounded p-3">
                <span>Ojo</span><span>Valor (mmHg)</span><span>Hora</span><span>Método</span><span></span>
                <span>OD</span><span>14</span><span>10:30</span><span>Tonómetro de aire</span><span></span>
                <span>OI</span><span>15</span><span>10:32</span><span>Tonómetro de aire</span><span></span>
            </div>
            </div>

            {/* Motilidad Ocular */}
            <div>
            <h4 className="font-semibold mb-2">Motilidad Ocular</h4>
            <div className="grid grid-cols-3 text-sm text-center border rounded p-3">
                <span>Movimiento</span><span>OD</span><span>OI</span>
                <span>Derecha</span><span>Normal</span><span>Normal</span>
                <span>Izquierda</span><span>Limitada</span><span>Normal</span>
                <span>Arriba</span><span>Normal</span><span>Normal</span>
                <span>Abajo</span><span>Normal</span><span>Normal</span>
            </div>
            </div>
            <Seleccion_diagnostico/>
        </Card>
        </div>
    );
};

export default DiagnosticoOftalmologia;
