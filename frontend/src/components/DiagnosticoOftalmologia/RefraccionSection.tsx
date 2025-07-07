import React from "react";
import { Input } from "@/components/ui/input";
import type { DatosOftalmologicos } from "@/types/patientTypes";

interface Props {
  formData: DatosOftalmologicos;
  handleChange: <
    K extends keyof DatosOftalmologicos,
    F extends keyof DatosOftalmologicos[K]
  >(
    section: K,
    field: F,
    value: DatosOftalmologicos[K][F]
  ) => void;
}

const RefraccionSection: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Refracción</h4>
      <div className="grid grid-cols-2 gap-4 text-sm border rounded p-4">
        <div className="space-y-2">
          <label>Esfera OD</label>
          <Input
            value={formData.refraccion.odEsfera}
            onChange={(e) => handleChange("refraccion", "odEsfera", e.target.value)}
            className="h-8"
            placeholder="Ej: -2.00"
          />
        </div>
        <div className="space-y-2">
          <label>Cilindro OD</label>
          <Input
            value={formData.refraccion.odCilindro}
            onChange={(e) => handleChange("refraccion", "odCilindro", e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <label>Eje OD</label>
          <Input
            value={formData.refraccion.odEje}
            onChange={(e) => handleChange("refraccion", "odEje", e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <label>AV OD</label>
          <Input
            value={formData.refraccion.odAv}
            onChange={(e) => handleChange("refraccion", "odAv", e.target.value)}
            className="h-8"
          />
        </div>

        <div className="space-y-2">
          <label>Esfera OI</label>
          <Input
            value={formData.refraccion.oiEsfera}
            onChange={(e) => handleChange("refraccion", "oiEsfera", e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <label>Cilindro OI</label>
          <Input
            value={formData.refraccion.oiCilindro}
            onChange={(e) => handleChange("refraccion", "oiCilindro", e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <label>Eje OI</label>
          <Input
            value={formData.refraccion.oiEje}
            onChange={(e) => handleChange("refraccion", "oiEje", e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <label>AV OI</label>
          <Input
            value={formData.refraccion.oiAv}
            onChange={(e) => handleChange("refraccion", "oiAv", e.target.value)}
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default RefraccionSection;
