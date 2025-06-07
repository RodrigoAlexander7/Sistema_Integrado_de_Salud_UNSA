import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BarraBusqueda() {
  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscar ejecutado");
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto mt-0">
      <Card className="w-full bg-gradient-to-br from-sky-200 via-blue-100 to-yellow-100 text-gray-800 shadow-lg p-4">
        <CardContent>
          <form onSubmit={handleBuscar} className="flex flex-col items-center gap-8 py-6">
            <CardTitle className="text-4xl font-bold text-center">
              Realizar Búsqueda
            </CardTitle>

            <div className="flex flex-col sm:flex-row justify-center gap-10 w-full">
              <div className="flex flex-col items-end gap-2 w-full">
                <Label htmlFor="cui" className="text-right w-full">Por CUI:</Label>
                <Input
                  id="cui"
                  type="text"
                  placeholder="Ingrese CUI"
                  className="bg-white text-black"
                />
              </div>

              <div className="flex flex-col items-end gap-2 w-full">
                <Label htmlFor="nombre" className="text-right w-full">Por Nombre:</Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Ingrese nombre"
                  className="bg-white text-black"
                />
              </div>

              <div className="flex flex-col items-end gap-2 w-full">
                <Label htmlFor="fecha" className="text-right w-full">Por Fecha:</Label>
                <Input
                  id="fecha"
                  type="date"
                  className="bg-white text-black"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-4 px-10 py-2 bg-black text-white hover:bg-gray-800"
            >
              Buscar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
