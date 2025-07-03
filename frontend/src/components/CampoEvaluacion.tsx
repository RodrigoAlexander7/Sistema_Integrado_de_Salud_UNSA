import React from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";

interface CampoEvaluacionProps {
  titulo: string;
  placeholder?: string;
}

const CampoEvaluacion: React.FC<CampoEvaluacionProps> = ({
  titulo,
  placeholder = "Completar aquí"
}) => {
  const { theme } = useTheme();

  return (
    <Card className={`p-4 border rounded-md shadow-sm ${
      theme === 'dark' 
        ? 'bg-gray-700 border-gray-600' 
        : 'bg-white border-slate-300'
    }`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <p className={`font-semibold text-lg ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
        }`}>{titulo}</p>
        <Input
          type="text"
          placeholder={placeholder}
          className={`flex-1 border-none outline-none ${
            theme === 'dark' 
              ? 'bg-gray-700 text-white placeholder-gray-400' 
              : 'bg-transparent text-gray-700 placeholder-gray-400'
          }`}
        />
      </div>
    </Card>
  );
};

export default CampoEvaluacion;