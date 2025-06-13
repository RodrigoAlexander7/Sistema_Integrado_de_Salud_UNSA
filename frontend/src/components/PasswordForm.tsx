import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, KeyRound } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface PasswordFormProps {
  onSubmit: (currentPassword: string, newPassword: string, confirmPassword: string) => void;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({ onSubmit }) => {
  const { theme } = useTheme();
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(currentPassword, newPassword, confirmPassword);
  };

  return (
    <div className="w-full">
      <Card className={`shadow-xl rounded-xl ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-blue-50'
      }`}>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Actualiza tu contraseña
            </h2>
            <p className={`mt-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Por seguridad, tu nueva contraseña debe ser diferente a las anteriores
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Contraseña actual
              </label>
              <div className="relative">
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña actual"
                  className={`pl-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                />
                <Lock className={`absolute left-3 top-3 h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Nueva contraseña
              </label>
              <div className="relative">
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Crea una nueva contraseña"
                  className={`pl-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                />
                <KeyRound className={`absolute left-3 top-3 h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <p className={`mt-2 text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Debe contener al menos 8 caracteres, incluyendo números y caracteres especiales
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirmar nueva contraseña
              </label>
              <div className="relative">
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu nueva contraseña"
                  className={`pl-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                />
                <Lock className={`absolute left-3 top-3 h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className={`w-full py-3 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700'
                    : 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600'
                }`}
              >
                Guardar nueva contraseña
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};