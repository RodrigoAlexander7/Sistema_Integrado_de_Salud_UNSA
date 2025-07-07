import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ObservacionesSection: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Observaciones</h4>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ingrese observaciones adicionales..."
        className="min-h-[100px]"
      />
    </div>
  );
};

export default ObservacionesSection;
