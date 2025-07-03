import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/context/ThemeContext";

interface CampoOftalmologico {
  name: string;
  value: string;
  type?: 'input' | 'select';
  options?: string[];
  placeholder?: string;
}

interface TablaOftalmologicaProps {
  titulo: string;
  columnas: string[];
  campos: CampoOftalmologico[][];
  onChange: (name: string, value: string) => void;
}

const TablaOftalmologica: React.FC<TablaOftalmologicaProps> = ({
  titulo,
  columnas,
  campos,
  onChange
}) => {
  const { theme } = useTheme();

  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-2">{titulo}</h4>
      <div className={`grid grid-cols-${columnas.length} gap-2 text-sm border rounded p-3 ${
        theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
      }`}>
        {columnas.map((col, idx) => (
          <span key={idx} className="text-center font-medium">{col}</span>
        ))}
        
        {campos.map((fila, rowIdx) => (
          <React.Fragment key={rowIdx}>
            {fila.map((campo, colIdx) => (
              campo.type === 'select' ? (
                <Select
                  key={`${rowIdx}-${colIdx}`}
                  value={campo.value}
                  onValueChange={(value) => onChange(campo.name, value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder={campo.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {campo.options?.map((option, i) => (
                      <SelectItem key={i} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  key={`${rowIdx}-${colIdx}`}
                  name={campo.name}
                  value={campo.value}
                  onChange={(e) => onChange(campo.name, e.target.value)}
                  className="h-8 text-center"
                  placeholder={campo.placeholder}
                />
              )
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TablaOftalmologica;