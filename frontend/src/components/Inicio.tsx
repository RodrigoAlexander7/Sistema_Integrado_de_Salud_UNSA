import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BarraOpciones from "./Barra-opciones";

interface PatientData {
    name: string;
    bloodPressure: string;
    temperature: string;
    heartRate: string;
    respiratoryRate: string;
    oxygenSaturation: string;
    weight: string;
    height: string;
    bmi: string;
}

const patientInfo: PatientData = {
    name: "Veronika Elizabeth, Rios Cuadros",
    bloodPressure: "120/80 mm Hg",
    temperature: "36.7 ºC",
    heartRate: "70 lpm",
    respiratoryRate: "17 rpm",
    oxygenSaturation: "97%",
    weight: "58",
    height: "1.65",
    bmi: "21 (Normal)",
};

const Inicio:React.FC = () => {
    return (
        <div>
            <div className="flex flex-col items-center px-4 py-6">
            <BarraOpciones/>
            <h1 className="text-2xl font-bold text-center mb-6 text-blue-900">Nuevo Paciente</h1>
            <Card className="w-full max-w-3xl mb-4 shadow-md">
            
            <CardContent className="p-4">
            
            <h2 className="font-semibold text-lg mb-2">Nombre: {patientInfo.name}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p><strong>Presión Arterial:</strong> {patientInfo.bloodPressure}</p>
                        <p><strong>Temperatura:</strong> {patientInfo.temperature}</p>
                        <p><strong>Frecuencia Cardíaca:</strong> {patientInfo.heartRate}</p>
                        <p><strong>Frecuencia Respiratoria:</strong> {patientInfo.respiratoryRate}</p>
                        <p><strong>Saturación Oxígeno:</strong> {patientInfo.oxygenSaturation}</p>
                        <p><strong>Peso:</strong> {patientInfo.weight}</p>
                        <p><strong>Altura:</strong> {patientInfo.height}</p>
                        <p><strong>IMC:</strong> {patientInfo.bmi}</p>
                    
                    </div>
                </div>
            </CardContent>
            </Card>
            </div>
        </div>
        
    );
};



export default Inicio;
