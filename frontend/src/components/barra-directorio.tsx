import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

interface BarraDirectorioProps {
  especialidad: string;
  disponibilidad: string;
  onEspecialidadChange: (value: string) => void;
  onDisponibilidadChange: (value: string) => void;
  onBuscar: () => void;
  onLimpiar: () => void;
}

export const BarraDirectorio: React.FC<BarraDirectorioProps> = ({
  especialidad,
  disponibilidad,
  onEspecialidadChange,
  onDisponibilidadChange,
  onBuscar,
  onLimpiar,
}) => {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-[90rem] mx-auto mt-0">
      <Card className={`w-full shadow-lg p-4 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white' 
          : 'bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 text-white'
      }`}>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onBuscar();
            }}
            className="flex flex-col items-center gap-8 py-6"
          >
            <CardTitle className={`text-4xl font-bold text-center ${
              theme === 'dark' ? 'text-white' : 'text-white'
            }`}>
              Directorio del Personal
            </CardTitle>

            <div className="flex flex-col sm:flex-row justify-center gap-10 w-full">
              <div className="flex flex-col items-end gap-2 w-full">
                <Label htmlFor="especialidad" className={`text-right w-full ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-200'
                }`}>
                  Especialidad:
                </Label>
                <Select value={especialidad} onValueChange={onEspecialidadChange}>
                  <SelectTrigger className={`${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                      : 'bg-white text-black'
                  }`}>
                    <SelectValue placeholder="-----" />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <SelectItem value="">-----</SelectItem>
                    <SelectItem value="Odontologia">Odontología</SelectItem>
                    <SelectItem value="Psicologia">Psicología</SelectItem>
                    <SelectItem value="Medicina">Medicina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-end gap-2 w-full">
                <Label htmlFor="disponibilidad" className={`text-right w-full ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-200'
                }`}>
                  Disponibilidad:
                </Label>
                <Select value={disponibilidad} onValueChange={onDisponibilidadChange}>
                  <SelectTrigger className={`${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                      : 'bg-white text-black'
                  }`}>
                    <SelectValue placeholder="-----" />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <SelectItem value="">-----</SelectItem>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="No Disponible">No disponible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className={`mt-4 px-10 py-2 ${
                  theme === 'dark' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-black hover:bg-gray-800'
                } text-white`}
              >
                Buscar
              </Button>
              <Button
                type="button"
                onClick={onLimpiar}
                className={`mt-4 px-10 py-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-600 hover:bg-gray-700' 
                    : 'bg-gray-500 hover:bg-gray-700'
                } text-white`}
              >
                Limpiar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};