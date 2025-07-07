import React from "react";
import { Input } from "@/components/ui/input";
import type { DatosOftalmologicos } from "@/types/patientTypes";

interface Props {
  formData: DatosOftalmologicos;
  handleNestedChange: <
    K extends keyof DatosOftalmologicos,
    S extends keyof DatosOftalmologicos[K],
    F extends keyof DatosOftalmologicos[K][S]
  >(
    section: K,
    subSection: S,
    field: F,
    value: DatosOftalmologicos[K][S][F]
  ) => void;
}

const AgudezaVisualSection: React.FC<Props> = ({ formData, handleNestedChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sin Corrección */}
        <div>
          <h4 className="font-semibold mb-2">Sin Corrección</h4>
          <div className="grid grid-cols-3 gap-2 text-sm border rounded p-3">
            <span className="font-medium text-center">Ojo</span>
            <span className="text-center">Lejos</span>
            <span className="text-center">Cerca</span>

            <span className="text-center">OD</span>
            <Input
              value={formData.agudezaVisual.sinCorreccion.odLejos}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "sinCorreccion", "odLejos", e.target.value)
              }
              className="h-8 text-center"
              placeholder="20/20"
            />
            <Input
              value={formData.agudezaVisual.sinCorreccion.odCerca}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "sinCorreccion", "odCerca", e.target.value)
              }
              className="h-8 text-center"
              placeholder="J1"
            />

            <span className="text-center">OI</span>
            <Input
              value={formData.agudezaVisual.sinCorreccion.oiLejos}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "sinCorreccion", "oiLejos", e.target.value)
              }
              className="h-8 text-center"
              placeholder="20/20"
            />
            <Input
              value={formData.agudezaVisual.sinCorreccion.oiCerca}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "sinCorreccion", "oiCerca", e.target.value)
              }
              className="h-8 text-center"
              placeholder="J1"
            />
          </div>
        </div>

        {/* Con Corrección */}
        <div>
          <h4 className="font-semibold mb-2">Con Corrección</h4>
          <div className="grid grid-cols-4 gap-2 text-sm border rounded p-3">
            <span className="font-medium text-center col-span-1">Ojo</span>
            <span className="text-center">Lejos</span>
            <span className="text-center">Cerca</span>
            <span className="text-center">Lentes</span>

            <span className="text-center">OD</span>
            <Input
              value={formData.agudezaVisual.conCorreccion.odLejos}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "conCorreccion", "odLejos", e.target.value)
              }
              className="h-8 text-center"
              placeholder="20/20"
            />
            <Input
              value={formData.agudezaVisual.conCorreccion.odCerca}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "conCorreccion", "odCerca", e.target.value)
              }
              className="h-8 text-center"
              placeholder="J1"
            />
            <Input
              value={formData.agudezaVisual.conCorreccion.lentesOd}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "conCorreccion", "lentesOd", e.target.value)
              }
              className="h-8 text-center"
              placeholder="-2.50 esf"
            />

            <span className="text-center">OI</span>
            <Input
              value={formData.agudezaVisual.conCorreccion.oiLejos}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "conCorreccion", "oiLejos", e.target.value)
              }
              className="h-8 text-center"
              placeholder="20/20"
            />
            <Input
              value={formData.agudezaVisual.conCorreccion.oiCerca}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "conCorreccion", "oiCerca", e.target.value)
              }
              className="h-8 text-center"
              placeholder="J1"
            />
            <Input
              value={formData.agudezaVisual.conCorreccion.lentesOi}
              onChange={(e) =>
                handleNestedChange("agudezaVisual", "conCorreccion", "lentesOi", e.target.value)
              }
              className="h-8 text-center"
              placeholder="-2.50 esf"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgudezaVisualSection;
