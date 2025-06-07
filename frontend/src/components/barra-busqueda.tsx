import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBuscar();
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto mt-0">
      <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg p-4">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 py-6">
            <CardTitle className="text-4xl font-bold text-center">
              Realizar Búsqueda
            </CardTitle>

            <div className="flex flex-col sm:flex-row justify-center gap-10 w-full">
              <div className="flex flex-col items-end gap-2 w-full">
                <Label htmlFor="cui" className="text-right w-full">Por CUI:</Label>
                <Input
                  id="cui"
                  type="text"
                  value={cui}
                  onChange={(e) => setCui(e.target.value)}
                  placeholder="Ingrese CUI"
                  className="bg-white text-black"
                />
              </div>

              <div className="flex flex-col items-end gap-2 w-full">
                <Label htmlFor="nombre" className="text-right w-full">Por Nombre:</Label>
                <Input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingrese nombre"
                  className="bg-white text-black"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-4 w-full">
                  <div className="flex flex-col w-full">
                    <Label htmlFor="fechaInicio" className="mb-2">Desde:</Label>
                    <Input
                      id="fechaInicio"
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      className="bg-white text-black"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <Label htmlFor="fechaFin" className="mb-2">Hasta:</Label>
                    <Input
                      id="fechaFin"
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      className="bg-white text-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                type="submit"
                className="px-8 py-2 bg-black text-white hover:bg-gray-800"
              >
                Buscar
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="px-8 py-2"
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
