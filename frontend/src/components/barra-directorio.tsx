import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface BarraDirectorioProps {
  especialidad: string;
  disponibilidad: string;
  onEspecialidadChange: (value: string) => void;
  onDisponibilidadChange: (value: string) => void;
  onBuscar: () => void;
  onLimpiar: () => void; // nuevo prop
}

export const BarraDirectorio: React.FC<BarraDirectorioProps> = ({
  especialidad,
  disponibilidad,
  onEspecialidadChange,
  onDisponibilidadChange,
  onBuscar,
  onLimpiar, // nuevo prop
}) => {
  return (
    <div className="w-full max-w-[90rem] mx-auto mt-0">
      <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg p-4">
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onBuscar();
            }}
            className="flex flex-col items-center gap-8 py-6"
          >
            <CardTitle className="text-4xl font-bold text-center">
              Directorio del Personal
            </CardTitle>

            <div className="flex flex-col sm:flex-row justify-center gap-10 w-full">
              <div className="flex flex-col items-end gap-2 w-full">
                <Label htmlFor="especialidad" className="text-right w-full">
                  Especialidad:
                </Label>
                <Select value={especialidad} onValueChange={onEspecialidadChange}>
                  <SelectTrigger className="bg-white text-black">
                    <SelectValue placeholder="-----" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">-----</SelectItem>
                    <SelectItem value="odontologia">Odontología</SelectItem>
                    <SelectItem value="psicologia">Psicología</SelectItem>
                    <SelectItem value="medicina">Medicina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-end gap-2 w-full">
                <Label htmlFor="disponibilidad" className="text-right w-full">
                  Disponibilidad:
                </Label>
                <Select value={disponibilidad} onValueChange={onDisponibilidadChange}>
                  <SelectTrigger className="bg-white text-black">
                    <SelectValue placeholder="-----" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">-----</SelectItem>
                    <SelectItem value="disponible">Disponible</SelectItem>
                    <SelectItem value="no_disponible">No disponible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="mt-4 px-10 py-2 bg-black text-white hover:bg-gray-800"
              >
                Buscar
              </Button>
              <Button
                type="button"
                onClick={onLimpiar}
                className="mt-4 px-10 py-2 bg-gray-500 text-white hover:bg-gray-700"
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
