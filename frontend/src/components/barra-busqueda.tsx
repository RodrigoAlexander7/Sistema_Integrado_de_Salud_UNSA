import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

interface BarraBusquedaProps {
  cui: string;
  setCui: (value: string) => void;
  nombre: string;
  setNombre: (value: string) => void;
  fechaInicio: string;
  setFechaInicio: (value: string) => void;
  fechaFin: string;
  setFechaFin: (value: string) => void;
  onBuscar: () => void;
  onLimpiar: () => void;
}

export function BarraBusqueda({
  cui,
  setCui,
  nombre,
  setNombre,
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  onBuscar,
  onLimpiar,
}: BarraBusquedaProps) {
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBuscar();
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto mt-0">
      <Card className={`w-full shadow-lg p-4 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white' 
          : 'bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 text-white'
      }`}>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 py-6">
            <CardTitle className={`text-4xl font-bold text-center ${
              theme === 'dark' ? 'text-white' : 'text-white'
            }`}>
              Realizar Búsqueda
            </CardTitle>

            <div className="flex flex-col sm:flex-row justify-center gap-6 w-full">
              {/* Campo CUI - más grande */}
              <div className="flex flex-col gap-2 flex-[2]">
                <Label htmlFor="cui" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-200'}`}>
                  Por CUI:
                </Label>
                <Input
                  id="cui"
                  type="text"
                  value={cui}
                  onChange={(e) => setCui(e.target.value)}
                  placeholder="Ingrese CUI"
                  className={`${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600 focus:border-blue-500' 
                      : 'bg-white text-black border-gray-300'
                  }`}
                />
              </div>

              {/* Campo Nombre - más grande */}
              <div className="flex flex-col gap-2 flex-[2]">
                <Label htmlFor="nombre" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-200'}`}>
                  Por Nombre:
                </Label>
                <Input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingrese nombre"
                  className={`${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600 focus:border-blue-500' 
                      : 'bg-white text-black border-gray-300'
                  }`}
                />
              </div>

              {/* Campos Fecha - más pequeños */}
              <div className="flex flex-col gap-2 flex-[1]">
                <div className="flex gap-2 h-full items-end">
                  <div className="flex-1 flex flex-col gap-2">
                    <Label htmlFor="fechaInicio" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-200'}`}>
                      Desde:
                    </Label>
                    <Input
                      id="fechaInicio"
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      className={`w-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600 focus:border-blue-500' 
                          : 'bg-white text-black border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <Label htmlFor="fechaFin" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-200'}`}>
                      Hasta:
                    </Label>
                    <Input
                      id="fechaFin"
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      className={`w-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600 focus:border-blue-500' 
                          : 'bg-white text-black border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                type="submit"
                className={`px-8 py-2 ${
                  theme === 'dark' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-black hover:bg-gray-800'
                } text-white`}
              >
                Buscar
              </Button>
              <Button
                type="button"
                variant="secondary"
                className={`px-8 py-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                onClick={onLimpiar}
              >
                Limpiar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}