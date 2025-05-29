import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultadoCardProps {
  cui: string;
  nombre: string;
  fecha: string;
}

const ResultadoCard: React.FC<ResultadoCardProps> = ({ cui, nombre, fecha }) => {
  return (
    <Card className="w-full">
      <CardContent className="py-2 px-4 grid grid-cols-4 items-center gap-4">
        <p className="text-sm">{cui}</p>
        <p className="text-sm">{nombre}</p>
        <p className="text-sm">{fecha}</p>
        <div className="flex justify-end">
          <Button variant="outline" className="h-8 px-3 text-sm">
            Ver Historial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultadoCard;
