import React, { useState } from "react";
import { PasswordForm } from "@/components/PasswordForm";
import { Lock } from "lucide-react";
import TitleCard from "@/components/TitleCard";
import { useNavigate } from "react-router-dom";
import { PasswordService } from "@/services/passwordService";
import { useAuth } from "@/context/AuthContext";

const CambiarContrasena: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Obtenemos user y logout del contexto

  const handlePasswordSubmit = async (
    currentPassword: string, 
    newPassword: string, 
    confirmPassword: string
  ) => {
    if (!user) {
      alert("No hay usuario autenticado");
      return;
    }

    // Validaciones del frontend
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (newPassword.length < 8) {
      alert("La nueva contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas nuevas no coinciden");
      return;
    }

    if (currentPassword === newPassword) {
      alert("La nueva contraseña debe ser diferente a la actual");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await PasswordService.changePassword(
        currentPassword, 
        newPassword,
        user.email // Pasamos el email del contexto
      );

      if (result.success) {
        alert("¡Contraseña actualizada exitosamente!");
        logout(); // Cerramos sesión
        navigate("/login"); // Redirigimos al login
      } else {
        alert(result.message || "Error al cambiar la contraseña");
      }
    } catch (error) {
      alert("Error inesperado. Por favor intenta nuevamente.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        <div className="w-full max-w-full">
          <TitleCard 
            title="Cambiar Contraseña" 
            icon={<Lock className="h-8 w-8" />} 
          />
          
          <div className="w-full max-w-2xl mx-auto mt-8">
            <PasswordForm 
              onSubmit={handlePasswordSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CambiarContrasena;