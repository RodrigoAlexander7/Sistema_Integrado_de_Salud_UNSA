import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ResultadoCardProps {
  columnas: (string | React.ReactNode)[];
  colCount?: number; // Número de columnas (por defecto 4)
}

const ResultadoCard: React.FC<ResultadoCardProps> = ({ columnas, colCount = 4 }) => {
  return (
    <Card className="w-full">
      <CardContent className={`py-2 px-4 grid grid-cols-${colCount} items-center gap-4`}>
        {columnas.map((col, idx) => (
          <div key={idx} className="text-sm truncate">{col}</div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResultadoCard;
