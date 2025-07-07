import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  handleSelectChange: (name: string, value: string) => void;
}

const PresionIntraocularSection: React.FC<Props> = ({ formData, handleChange, handleSelectChange }) => {
  const data = formData.presionIntraocular;

  return (
    <div>
      <h4 className="font-semibold mb-2">Presión Intraocular</h4>
      <div className="grid grid-cols-2 gap-4 text-sm border rounded p-4">
        <div className="space-y-2">
          <label>OD - Valor</label>
          <Input
            value={data.odValor}
            onChange={(e) => handleChange("presionIntraocular", "odValor", e.target.value)}
            className="h-8"
            placeholder="Ej: 15"
          />
        </div>
        <div className="space-y-2">
          <label>OD - Hora</label>
          <Input
            type="time"
            value={data.odHora}
            onChange={(e) => handleChange("presionIntraocular", "odHora", e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-2 col-span-2">
          <label>OD - Método</label>
          <Select
            value={data.odMetodo}
            onValueChange={(value) => handleSelectChange("presionIntraocular.odMetodo", value)}
          >
            <SelectTrigger className="w-full h-8">
              <SelectValue placeholder="Seleccione método OD" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Goldmann">Goldmann</SelectItem>
              <SelectItem value="Tonopen">Tonopen</SelectItem>
              <SelectItem value="Icare">Icare</SelectItem>
              <SelectItem value="Otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label>OI - Valor</label>
          <Input
            value={data.oiValor}
            onChange={(e) => handleChange("presionIntraocular", "oiValor", e.target.value)}
            className="h-8"
            placeholder="Ej: 16"
          />
        </div>
        <div className="space-y-2">
          <label>OI - Hora</label>
          <Input
            type="time"
            value={data.oiHora}
            onChange={(e) => handleChange("presionIntraocular", "oiHora", e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-2 col-span-2">
          <label>OI - Método</label>
          <Select
            value={data.oiMetodo}
            onValueChange={(value) => handleSelectChange("presionIntraocular.oiMetodo", value)}
          >
            <SelectTrigger className="w-full h-8">
              <SelectValue placeholder="Seleccione método OI" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Goldmann">Goldmann</SelectItem>
              <SelectItem value="Tonopen">Tonopen</SelectItem>
              <SelectItem value="Icare">Icare</SelectItem>
              <SelectItem value="Otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PresionIntraocularSection;
