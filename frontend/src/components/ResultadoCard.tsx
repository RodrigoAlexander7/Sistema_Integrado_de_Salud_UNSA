import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultadoCardProps {
  columnas: {
    contenido: React.ReactNode;
    ancho?: "1" | "2" | "3" | "4" | "5" | "6" | "full";
    alineacion?: "izquierda" | "centro" | "derecha";
    truncar?: boolean;
  }[];
  className?: string;
}

export function ResultadoCard({ columnas, className }: ResultadoCardProps) {
  return (
    <Card className={cn("w-full border-none", className)}>
      <div className="grid grid-cols-12 gap-4 px-6 items-center">
        {columnas.map((col, index) => (
          <div
            key={index}
            className={cn(
              col.ancho === "1" && "col-span-1",
              col.ancho === "2" && "col-span-2",
              col.ancho === "3" && "col-span-3",
              col.ancho === "4" && "col-span-4",
              col.ancho === "5" && "col-span-5",
              col.ancho === "6" && "col-span-6",
              col.ancho === "full" && "col-span-12",
              !col.ancho && "col-span-1",
              col.alineacion === "izquierda" && "text-left",
              col.alineacion === "centro" && "text-center",
              col.alineacion === "derecha" && "text-right justify-end",
              col.truncar && "truncate",
            )}
          >
            {col.contenido}
          </div>
        ))}
      </div>
    </Card>
  );
}