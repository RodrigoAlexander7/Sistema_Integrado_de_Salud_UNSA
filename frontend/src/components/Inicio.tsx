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

const PatientCard: React.FC<{ data: PatientData; showVitals?: boolean }> = ({ data, showVitals = true }) => {
    return (
        <div>
            
            <Card className="w-full max-w-3xl mb-4 shadow-md">
            
            <CardContent className="p-4">
            
            <h2 className="font-semibold text-lg mb-2">Nombre: {data.name}</h2>
            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <p><strong>Presión Arterial:</strong> {data.bloodPressure}</p>
                <p><strong>Temperatura:</strong> {data.temperature}</p>
                {showVitals && (
                <>
                    <p><strong>Frecuencia Cardíaca:</strong> {data.heartRate}</p>
                    <p><strong>Frecuencia Respiratoria:</strong> {data.respiratoryRate}</p>
                </>
                )}
            </div>
            <div className="space-y-2">
                <p><strong>Saturación Oxígeno:</strong> {data.oxygenSaturation}</p>
                <p><strong>Peso:</strong> {data.weight}</p>
                {showVitals && (
                <>
                    <p><strong>Altura:</strong> {data.height}</p>
                    <p><strong>IMC:</strong> {data.bmi}</p>
                </>
                )}
            </div>
            </div>
        </CardContent>
        </Card>
        </div>
        
    );
};

const Inicio: React.FC = () => {
    return (
        <div className="flex flex-col items-center px-4 py-6">
        <BarraOpciones/>
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-900">Nuevo Paciente</h1>
        <PatientCard data={patientInfo} />
        <PatientCard data={patientInfo} showVitals={false} />
        </div>
    );
};

export default Inicio;
