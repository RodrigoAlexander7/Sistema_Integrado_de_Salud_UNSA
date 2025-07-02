import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import DoctorCard from "@/components/DoctorCard";
import TitleCard from "@/components/TitleCard";
import EmptyStateCard from "@/components/EmptyStateCard";
import { ProfileService } from "@/services/profileService";
import type { DoctorInfo } from "@/types/profileTypes";

const Perfil: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await ProfileService.getDoctorProfile();
        setDoctor(profileData);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <div className="w-full max-w-full">
          <TitleCard 
            title="Perfil de Usuario" 
            icon={<User className="h-8 w-8" />} 
          />
          
          {doctor ? (
            <DoctorCard doctor={formatDoctorData(doctor)} />
          ) : (
            <EmptyStateCard
              title="Perfil no disponible"
              description="No se encontró información de perfil para mostrar."
              icon={<User className="h-12 w-12 text-gray-400" />}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// Función para formatear los datos del doctor
function formatDoctorData(doctor: DoctorInfo) {
  return {
    name: doctor.name,
    specialty: doctor.specialty,
    email: doctor.email,
    location: doctor.location,
    document: doctor.documentType && doctor.documentNumber 
      ? `${doctor.documentType}: ${doctor.documentNumber}`
      : undefined,
    license: doctor.licenseNumber,
    phone: doctor.phone
  };
}

export default Perfil;