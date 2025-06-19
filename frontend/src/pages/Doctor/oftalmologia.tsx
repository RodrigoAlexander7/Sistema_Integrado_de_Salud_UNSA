import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import FichaEstudiante from "@/components/FichaEstudiante";
import SeleccionDiagnostico from "@/components/diagnostico-primario-secundario";
import TitleCard from "@/components/TitleCard";
import { File } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";

const DiagnosticoOftalmologia: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    agudezaVisual: {
      sinCorreccion: {
        odLejos: "20/20",
        odCerca: "J1",
        oiLejos: "20/25",
        oiCerca: "J2"
      },
      conCorreccion: {
        odLejos: "20/20",
        odCerca: "J1",
        oiLejos: "20/25",
        oiCerca: "J2",
        lentesOd: "-2.50 esf +0.50 cil x180º",
        lentesOi: "-2.75 esf +0.75 cil x170º"
      }
    },
    refraccion: {
      odEsfera: "-2.5",
      odCilindro: "+0.50",
      odEje: "180",
      odAv: "20/20",
      oiEsfera: "-2.5",
      oiCilindro: "+0.50",
      oiEje: "180",
      oiAv: "20/20"
    },
    presionIntraocular: {
      odValor: "14",
      odHora: "10:30",
      odMetodo: "Tonómetro de aire",
      oiValor: "15",
      oiHora: "10:32",
      oiMetodo: "Tonómetro de aire"
    },
    motilidadOcular: {
      derechaOd: "Normal",
      derechaOi: "Normal",
      izquierdaOd: "Limitada",
      izquierdaOi: "Normal",
      arribaOd: "Normal",
      arribaOi: "Normal",
      abajoOd: "Normal",
      abajoOi: "Normal"
    },
    observaciones: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [section, subSection, field] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof formData],
        [subSection]: {
          ...(prev[section as keyof typeof formData] as any)[subSection],
          [field]: value
        }
      }
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    const [section, subSection, field] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof formData],
        [subSection]: {
          ...(prev[section as keyof typeof formData] as any)[subSection],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí iría la lógica para enviar los datos al servidor
  };

  return (
    <div className="w-full">
      {/* Título principal */}
      <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
        {/* Contenedor principal */}
        <div className="w-full max-w-full">
          <TitleCard 
              title="Bienvenido" 
              icon={<UserPlus className="h-8 w-8" />} 
          />
        </div>
      </main>

      {/* Contenido */}
      <div className="w-full px-8">
        <form onSubmit={handleSubmit}>
          <div className={`w-full max-w-6xl border rounded-xl shadow-sm p-6 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-300'
          }`}>
            <FichaEstudiante />

            {/* Agudeza visual */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Agudeza visual</h3>
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
                      name="agudezaVisual.sinCorreccion.odLejos"
                      value={formData.agudezaVisual.sinCorreccion.odLejos}
                      onChange={handleChange}
                      className="h-8 text-center"
                    />
                    <Input 
                      name="agudezaVisual.sinCorreccion.odCerca"
                      value={formData.agudezaVisual.sinCorreccion.odCerca}
                      onChange={handleChange}
                      className="h-8 text-center"
                    />
                    
                    <span className="text-center">OI</span>
                    <Input 
                      name="agudezaVisual.sinCorreccion.oiLejos"
                      value={formData.agudezaVisual.sinCorreccion.oiLejos}
                      onChange={handleChange}
                      className="h-8 text-center"
                    />
                    <Input 
                      name="agudezaVisual.sinCorreccion.oiCerca"
                      value={formData.agudezaVisual.sinCorreccion.oiCerca}
                      onChange={handleChange}
                      className="h-8 text-center"
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
                    <span className="text-center">Lentes Utilizados</span>
                    
                    <span className="text-center">OD</span>
                    <Input 
                      name="agudezaVisual.conCorreccion.odLejos"
                      value={formData.agudezaVisual.conCorreccion.odLejos}
                      onChange={handleChange}
                      className="h-8 text-center"
                    />
                    <Input 
                      name="agudezaVisual.conCorreccion.odCerca"
                      value={formData.agudezaVisual.conCorreccion.odCerca}
                      onChange={handleChange}
                      className="h-8 text-center"
                    />
                    <Input 
                      name="agudezaVisual.conCorreccion.lentesOd"
                      value={formData.agudezaVisual.conCorreccion.lentesOd}
                      onChange={handleChange}
                      className="h-8 text-center"
                    />
                    
                    <span className="text-center">OI</span>
                    <Input 
                      name="agudezaVisual.conCorreccion.oiLejos"
                      value={formData.agudezaVisual.conCorreccion.oiLejos}
                      onChange={handleChange}
                      className="h-8 text-center"
                    />
                    <Input 
                      name="agudezaVisual.conCorreccion.oiCerca"
                      value={formData.agudezaVisual.conCorreccion.oiCerca}
                      onChange={handleChange}
                      className="h-8 text-center"
                    />
                    <Input 
                      name="agudezaVisual.conCorreccion.lentesOi"
                      value={formData.agudezaVisual.conCorreccion.lentesOi}
                      onChange={handleChange}
                      className="h-8 text-center"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4 mt-4">Exámenes Oculares</h3>

              {/* Refracción */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Refracción</h4>
                <div className="grid grid-cols-6 gap-2 text-sm border rounded p-3">
                  <span className="text-center">Ojo</span>
                  <span className="text-center">Esfera</span>
                  <span className="text-center">Cilindro</span>
                  <span className="text-center">Eje</span>
                  <span className="text-center">AV</span>
                  <span></span>
                  
                  <span className="text-center">OD</span>
                  <Input 
                    name="refraccion.odEsfera"
                    value={formData.refraccion.odEsfera}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Input 
                    name="refraccion.odCilindro"
                    value={formData.refraccion.odCilindro}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Input 
                    name="refraccion.odEje"
                    value={formData.refraccion.odEje}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Input 
                    name="refraccion.odAv"
                    value={formData.refraccion.odAv}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <span></span>
                  
                  <span className="text-center">OI</span>
                  <Input 
                    name="refraccion.oiEsfera"
                    value={formData.refraccion.oiEsfera}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Input 
                    name="refraccion.oiCilindro"
                    value={formData.refraccion.oiCilindro}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Input 
                    name="refraccion.oiEje"
                    value={formData.refraccion.oiEje}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Input 
                    name="refraccion.oiAv"
                    value={formData.refraccion.oiAv}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <span></span>
                </div>
              </div>

              {/* Presión Intraocular */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Presión Intraocular</h4>
                <div className="grid grid-cols-5 gap-2 text-sm border rounded p-3">
                  <span className="text-center">Ojo</span>
                  <span className="text-center">Valor (mmHg)</span>
                  <span className="text-center">Hora</span>
                  <span className="text-center">Método</span>
                  <span></span>
                  
                  <span className="text-center">OD</span>
                  <Input 
                    name="presionIntraocular.odValor"
                    value={formData.presionIntraocular.odValor}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Input 
                    name="presionIntraocular.odHora"
                    value={formData.presionIntraocular.odHora}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Select 
                    value={formData.presionIntraocular.odMetodo}
                    onValueChange={(value) => handleSelectChange("presionIntraocular.odMetodo", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Seleccione método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tonómetro de aire">Tonómetro de aire</SelectItem>
                      <SelectItem value="Tonómetro de Goldmann">Tonómetro de Goldmann</SelectItem>
                      <SelectItem value="Tonómetro de Perkins">Tonómetro de Perkins</SelectItem>
                    </SelectContent>
                  </Select>
                  <span></span>
                  
                  <span className="text-center">OI</span>
                  <Input 
                    name="presionIntraocular.oiValor"
                    value={formData.presionIntraocular.oiValor}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Input 
                    name="presionIntraocular.oiHora"
                    value={formData.presionIntraocular.oiHora}
                    onChange={handleChange}
                    className="h-8 text-center"
                  />
                  <Select 
                    value={formData.presionIntraocular.oiMetodo}
                    onValueChange={(value) => handleSelectChange("presionIntraocular.oiMetodo", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Seleccione método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tonómetro de aire">Tonómetro de aire</SelectItem>
                      <SelectItem value="Tonómetro de Goldmann">Tonómetro de Goldmann</SelectItem>
                      <SelectItem value="Tonómetro de Perkins">Tonómetro de Perkins</SelectItem>
                    </SelectContent>
                  </Select>
                  <span></span>
                </div>
              </div>

              {/* Motilidad Ocular */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Motilidad Ocular</h4>
                <div className="grid grid-cols-3 text-sm border rounded p-3">
                  <span className="text-center font-medium">Movimiento</span>
                  <span className="text-center font-medium">OD</span>
                  <span className="text-center font-medium">OI</span>
                  
                  <span className="text-center">Derecha</span>
                  <Select 
                    value={formData.motilidadOcular.derechaOd}
                    onValueChange={(value) => handleSelectChange("motilidadOcular.derechaOd", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Limitada">Limitada</SelectItem>
                      <SelectItem value="Ausente">Ausente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={formData.motilidadOcular.derechaOi}
                    onValueChange={(value) => handleSelectChange("motilidadOcular.derechaOi", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Limitada">Limitada</SelectItem>
                      <SelectItem value="Ausente">Ausente</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <span className="text-center">Izquierda</span>
                  <Select 
                    value={formData.motilidadOcular.izquierdaOd}
                    onValueChange={(value) => handleSelectChange("motilidadOcular.izquierdaOd", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Limitada">Limitada</SelectItem>
                      <SelectItem value="Ausente">Ausente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={formData.motilidadOcular.izquierdaOi}
                    onValueChange={(value) => handleSelectChange("motilidadOcular.izquierdaOi", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Limitada">Limitada</SelectItem>
                      <SelectItem value="Ausente">Ausente</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <span className="text-center">Arriba</span>
                  <Select 
                    value={formData.motilidadOcular.arribaOd}
                    onValueChange={(value) => handleSelectChange("motilidadOcular.arribaOd", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Limitada">Limitada</SelectItem>
                      <SelectItem value="Ausente">Ausente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={formData.motilidadOcular.arribaOi}
                    onValueChange={(value) => handleSelectChange("motilidadOcular.arribaOi", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Limitada">Limitada</SelectItem>
                      <SelectItem value="Ausente">Ausente</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <span className="text-center">Abajo</span>
                  <Select 
                    value={formData.motilidadOcular.abajoOd}
                    onValueChange={(value) => handleSelectChange("motilidadOcular.abajoOd", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Limitada">Limitada</SelectItem>
                      <SelectItem value="Ausente">Ausente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={formData.motilidadOcular.abajoOi}
                    onValueChange={(value) => handleSelectChange("motilidadOcular.abajoOi", value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Limitada">Limitada</SelectItem>
                      <SelectItem value="Ausente">Ausente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Observaciones */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Observaciones</h4>
                <Textarea 
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  placeholder="Escriba aquí cualquier observación adicional..."
                  className={`min-h-[100px] ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              {/* Diagnóstico */}
              <SeleccionDiagnostico />

            </Card>

            {/* Botones de acción */}
            <div className="flex justify-end gap-4 mt-6">
              <Button 
                type="button" 
                variant="outline"
                className={`${
                  theme === 'dark' 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className={`${
                  theme === 'dark' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Guardar Diagnóstico
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiagnosticoOftalmologia;