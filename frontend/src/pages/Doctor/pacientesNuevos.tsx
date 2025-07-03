import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import PatientCard from "@/components/PatientCard";
import TitleCard from "@/components/TitleCard";
import { PatientService } from "@/services/patientService";
import EmptyStateCard from "@/components/EmptyStateCard";
import type { Patient } from "@/types/patientTypes";

const PacientesNuevos: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const patientData = await PatientService.getNewPatient();
        setPatient(patientData);
      } catch (err) {
        setError("Error al cargar los datos del paciente");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  const handleDiagnostico = async (specialty: string) => {
    if (!patient) return;
    
    try {
      const response = await PatientService.startDiagnosis({
        patientId: patient.id,
        specialty
      });
      
      navigate(`/${specialty}-diagnostico`, { 
        state: { 
          patientId: patient.id,
          episodeId: response.episodeId,
          clinicalRecordId: response.clinicalRecordId
        } 
      });
    } catch (err) {
      //toast.error("Error al iniciar el diagnóstico");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 text-center text-red-500">
        {error}
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <div className="w-full max-w-full">
          <TitleCard 
            title="Nuevo Paciente" 
            icon={<UserPlus className="h-8 w-8" />} 
          />

          {patient ? (
            <PatientCard
              patient={formatPatientData(patient)}
              onAtenderPaciente={handleDiagnostico}
            />
          ) : (
            <EmptyStateCard
              title="No hay pacientes nuevos"
              description="Actualmente no hay pacientes esperando atención."
              icon={<UserPlus className="h-12 w-12 text-gray-400" />}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// Función para formatear los datos del paciente
function formatPatientData(patient: Patient) {
  return {
    name: `${patient.firstName} ${patient.lastName}`,
    document: `${patient.documentType}: ${patient.documentNumber}`,
    age: calculateAge(patient.birthDate),
    gender: patient.gender === 'F' ? 'Femenino' : 'Masculino',
    bloodType: patient.bloodType || 'No especificado',
    bloodPressure: patient.vitalSigns.bloodPressure || 'N/A',
    temperature: patient.vitalSigns.temperature ? `${patient.vitalSigns.temperature} °C` : 'N/A',
    heartRate: patient.vitalSigns.heartRate ? `${patient.vitalSigns.heartRate} lpm` : 'N/A',
    respiratoryRate: patient.vitalSigns.respiratoryRate ? `${patient.vitalSigns.respiratoryRate} rpm` : 'N/A',
    oxygenSaturation: patient.vitalSigns.oxygenSaturation ? `${patient.vitalSigns.oxygenSaturation}%` : 'N/A',
    weight: patient.vitalSigns.weight ? `${patient.vitalSigns.weight} kg` : 'N/A',
    height: patient.vitalSigns.height ? `${patient.vitalSigns.height} m` : 'N/A',
    bmi: patient.vitalSigns.bmi ? `${patient.vitalSigns.bmi.toFixed(1)} (${getBmiCategory(patient.vitalSigns.bmi)})` : 'N/A'
  };
}

// Función para calcular la edad
function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Función para categorizar IMC
function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Bajo peso";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Sobrepeso";
  return "Obesidad";
}

export default PacientesNuevos;