import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { File } from "lucide-react";
import TitleCard from "@/components/TitleCard";

interface FormData {
  facultad: string;
  cui: string;
  nombres: string;
  dni: string;
  edad: number | string;
  sexo: string;
  estadoCivil: string;
  procedencia: string;
  domicilio: string;
  telefono: string;
  email: string;
  ocupacion: string;
  contactoEmergencia: string;
  dia: string;
  mes: string;
  anio: string;
}

const HistoriaClinicaIngreso: React.FC = () => {
  const navigate = useNavigate();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    facultad: "",
    cui: "",
    nombres: "",
    dni: "",
    edad: "",
    sexo: "",
    estadoCivil: "",
    procedencia: "",
    domicilio: "",
    telefono: "",
    email: "",
    ocupacion: "",
    contactoEmergencia: "",
    dia: "",
    mes: "",
    anio: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aquí debes reemplazar la URL con tu endpoint real
      const response = await fetch('https://tu-api.com/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Puedes agregar transformaciones adicionales aquí si es necesario
          fecha: `${formData.anio}-${formData.mes}-${formData.dia}`
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const data = await response.json();
      console.log('Success:', data);
      setMostrarAlerta(true);
      setTimeout(() => {
        setMostrarAlerta(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="w-full min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <TitleCard 
        title="Creación de historia clínica" 
        icon={<File className="h-8 w-8" />} 
      />
      
      <div className="border-2 border-blue-400 p-6 rounded-md w-full max-w-5xl shadow-sm">
        <h2 className="text-xl font-semibold text-center mb-6">
          Ingreso de Información Personal del Paciente
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Fila 1 */}
          <div>
            <Label>Facultad y/o ESC. PROF:</Label>
            <Input 
              type="text" 
              name="facultad"
              value={formData.facultad}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>CUI:</Label>
            <Input 
              type="text" 
              name="cui"
              value={formData.cui}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fila 2 */}
          <div>
            <Label>Apellidos y Nombres:</Label>
            <Input 
              type="text" 
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>DNI:</Label>
            <Input 
              type="text" 
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fila 3 */}
          <div>
            <Label>Edad:</Label>
            <Input 
              type="number" 
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Sexo:</Label>
              <Input 
                type="text" 
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Estado Civil:</Label>
              <Input 
                type="text" 
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Procedencia:</Label>
              <Input 
                type="text" 
                name="procedencia"
                value={formData.procedencia}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fila 4 */}
          <div className="col-span-2">
            <Label>Domicilio:</Label>
            <Input 
              type="text" 
              name="domicilio"
              value={formData.domicilio}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fila 5 */}
          <div>
            <Label>Teléfono:</Label>
            <Input 
              type="text" 
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Correo Electrónico:</Label>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fila 6 */}
          <div>
            <Label>Ocupación:</Label>
            <Input 
              type="text" 
              name="ocupacion"
              value={formData.ocupacion}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Contacto de Emergencia:</Label>
            <Input 
              type="text" 
              name="contactoEmergencia"
              value={formData.contactoEmergencia}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fila 7 - Fecha */}
          <div className="col-span-2 flex flex-wrap gap-4 mt-2">
            <div className="flex flex-col">
              <Label>Fecha:</Label>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  placeholder="Día" 
                  className="w-24" 
                  name="dia"
                  value={formData.dia}
                  onChange={handleChange}
                  required
                />
                <Input 
                  type="number" 
                  placeholder="Mes" 
                  className="w-24" 
                  name="mes"
                  value={formData.mes}
                  onChange={handleChange}
                  required
                />
                <Input 
                  type="number" 
                  placeholder="Año" 
                  className="w-28" 
                  name="anio"
                  value={formData.anio}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Botón de submit */}
          <div className="col-span-2 mt-6 flex justify-center">
            <Button 
              type="submit"
              className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-2 rounded-lg"
            >
              Inscribir Paciente
            </Button>
          </div>
        </form>

        {mostrarAlerta && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Paciente registrado exitosamente
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              ¿Qué deseas hacer a continuación?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/Inicio-Enfermeria")}
              >
                Aceptar
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate("/triaje")}
              >
                Comenzar episodio médico
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoriaClinicaIngreso;