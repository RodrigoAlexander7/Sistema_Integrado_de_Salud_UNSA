import React from "react";
import { Input } from "@/components/ui/input";
import type { DatosOftalmologicos } from "@/types/patientTypes";

interface Props {
  formData: DatosOftalmologicos;
  handleSelectChange: (name: string, value: string) => void;
}

const MotilidadOcularSection: React.FC<Props> = ({
  formData,
  handleSelectChange
}) => {
  const data = formData.motilidadOcular;

  return (
    <div>
      <h4 className="font-semibold mb-2">Motilidad Ocular</h4>
      <div className="grid grid-cols-2 gap-4 text-sm border rounded p-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <label className="capitalize block">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
            </label>
            <Input
              className="h-8"
              value={value}
              onChange={(e) =>
                handleSelectChange(`motilidadOcular.${key}`, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotilidadOcularSection;
