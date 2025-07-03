import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

interface AccionesDiagnosticoProps {
  onCancelar: (e: React.FormEvent) => void;
  textoCancelar?: string;
  textoGuardar?: string;
}

const AccionesDiagnostico: React.FC<AccionesDiagnosticoProps> = ({
  onCancelar,
  textoCancelar = "Cancelar",
  textoGuardar = "Guardar Diagnóstico"
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-end gap-4 mt-6">
      <Button 
        type="button" 
        variant="outline"
        onClick={onCancelar}
        className={`${
          theme === 'dark' 
            ? 'border-gray-600 hover:bg-gray-700' 
            : 'border-gray-300 hover:bg-gray-100'
        }`}
      >
        {textoCancelar}
      </Button>
      <Button 
        type="submit"
        className={`${
          theme === 'dark' 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {textoGuardar}
      </Button>
    </div>
  );
};

export default AccionesDiagnostico;