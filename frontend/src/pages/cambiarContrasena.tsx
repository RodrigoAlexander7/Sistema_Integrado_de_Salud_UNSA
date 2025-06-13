import React from "react";
import { PasswordForm } from "@/components/PasswordForm";
import { Lock } from "lucide-react";
import TitleCard from "@/components/TitleCard";

const CambiarContrasena: React.FC = () => {
  const handlePasswordSubmit = (currentPassword: string, newPassword: string, confirmPassword: string) => {
    // Lógica para manejar el cambio de contraseña
    console.log({ currentPassword, newPassword, confirmPassword });
  };
  return (
    <div className="w-full">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <div className="w-full max-w-full">
          <TitleCard 
            title="Cambiar Contraseña" 
            icon={<Lock className="h-8 w-8" />} 
          />

          {/* Formulario de cambio de contraseña */}
          <div className="w-full">
            <PasswordForm onSubmit={handlePasswordSubmit} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CambiarContrasena;