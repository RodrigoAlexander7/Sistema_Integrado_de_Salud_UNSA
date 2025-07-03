import React from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/context/ThemeContext";
import TablaOftalmologica from "./TablaOftalmologica";

interface SeccionOftalmologicaProps {
  titulo: string;
  subtitulos?: string[];
  tablas: {
    titulo: string;
    columnas: string[];
    campos: {
      name: string;
      value: string;
      type?: 'input' | 'select';
      options?: string[];
      placeholder?: string;
    }[][];
  }[];
  observaciones?: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
}

const SeccionOftalmologica: React.FC<SeccionOftalmologicaProps> = ({
  titulo,
  subtitulos,
  tablas,
  observaciones
}) => {
  const { theme } = useTheme();

  return (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{titulo}</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {subtitulos?.map((subtitulo, idx) => (
          <div key={idx}>
            <h4 className="font-semibold mb-2">{subtitulo}</h4>
            {/* Contenido específico podría ir aquí */}
          </div>
        ))}
      </div>

      {tablas.map((tabla, idx) => (
        <TablaOftalmologica
          key={idx}
          titulo={tabla.titulo}
          columnas={tabla.columnas}
          campos={tabla.campos}
          onChange={(_name, _value) => {
            // Implementar manejo de cambios según necesidad
          }}
        />
      ))}

      {observaciones && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Observaciones</h4>
          <Textarea 
            name={observaciones.name}
            value={observaciones.value}
            onChange={observaciones.onChange}
            placeholder="Escriba aquí cualquier observación adicional..."
            className={`min-h-[100px] ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            }`}
          />
        </div>
      )}
    </Card>
  );
};

export default SeccionOftalmologica;