import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BarraOpciones from "../components/Barra-opciones";

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
    weight: "58 kg",
    height: "1.65 m",
    bmi: "21 (Normal)",
    };

    const PatientCard: React.FC<{ data: PatientData; showVitals?: boolean }> = ({
    data,
    showVitals = true,
    }) => {
    return (
        <Card className="w-full max-w-5xl shadow-md">
        <CardContent className="p-6">
            <h2 className="font-bold text-xl mb-4 text-blue-800">
            {data.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm md:text-base">
            <div><span className="font-medium">Presión Arterial:</span> {data.bloodPressure}</div>
            <div><span className="font-medium">Temperatura:</span> {data.temperature}</div>
            {showVitals && (
                <>
                <div><span className="font-medium">Frecuencia Cardíaca:</span> {data.heartRate}</div>
                <div><span className="font-medium">Frecuencia Respiratoria:</span> {data.respiratoryRate}</div>
                </>
            )}
            <div><span className="font-medium">Saturación Oxígeno:</span> {data.oxygenSaturation}</div>
            <div><span className="font-medium">Peso:</span> {data.weight}</div>
            {showVitals && (
                <>
                <div><span className="font-medium">Altura:</span> {data.height}</div>
                <div><span className="font-medium">IMC:</span> {data.bmi}</div>
                </>
            )}
            </div>
        </CardContent>
        </Card>
    );
    };

    const Inicio: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-gray-50">
        <BarraOpciones />
        <main className="mt-20 px-6 md:px-12 py-6 flex flex-col gap-6 items-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-4 self-start ">Nuevo Paciente</h1>
            <PatientCard data={patientInfo} />
            <PatientCard data={patientInfo} showVitals={false} />   
        </main>
        </div>
    );
    };

export default Inicio;

