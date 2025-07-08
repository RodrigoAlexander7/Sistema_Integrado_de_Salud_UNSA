import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import BarraOpciones from "../../components/barra-opciones-enfermeria";
import { useNavigate } from "react-router-dom";
import { File } from "lucide-react";
//import { useTheme } from "@/context/ThemeContext";
import TitleCard from "@/components/TitleCard";



const HistoriaClinicaIngreso: React.FC = () => {
  const navigate = useNavigate();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const [formData, setFormData] = useState({
    tipoDocumento: "DNI",
    numDocumento: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "", // formato YYYY-MM-DD
    genero: "",
    direccion: "",
    telefono: "",
    correo: "",
    grupoSanguineo: "",
    antecedentesFamiliares: "",
    estadoCivil: "",
    programaAcademicoId: 1, 
    contactosEmergencia: [
      {
        nombres: "",
        apellidos: "",
        parentesco: "",
        telefonoPrincipal: "",
        telefonoSecundario: "",
        direccion: ""
      }
    ]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmergenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contactosEmergencia: [
        {
          ...prev.contactosEmergencia[0],
          [name]: value
        }
      ]
    }));
  };

  const handleInicioEnf = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = {
        ...formData,
        fechaNacimiento: new Date(formData.fechaNacimiento).toISOString()
      };

      const res = await fetch("http://localhost:4000/api/pacientes/personal-info-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // <-- necesario para enviar la cookie con el token
        body: JSON.stringify(formDataToSend)
      });

      const data = await res.json();
      if (res.ok) {
        setMostrarAlerta(true);
        setTimeout(() => {
          setMostrarAlerta(false);
          navigate("/Inicio-Enfermeria");
        }, 3000);
      } else {
        alert(data.message || "Error al registrar paciente");
      }
    } catch (error) {
      console.error("Error al registrar paciente:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <TitleCard title="Creación de historia clínica" icon={<File className="h-8 w-8" />} />

      <div className="border-2 border-blue-400 p-6 rounded-md w-full max-w-5xl shadow-sm">
        <h2 className="text-xl font-semibold text-center mb-6">
          Ingreso de Información Personal del Paciente
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" onSubmit={handleInicioEnf}>
          <div>
            <Label>Facultad y/o ESC. PROF:</Label>
            <Input type="text" value="Ingeniería de Sistemas" disabled />
          </div>
          
          <div>
            <Label>Tipo de Documento:</Label>
            <Input
                type="text"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                readOnly // <- permite que se envíe el valor pero sin modificarlo
                className="w-full border border-gray-300 rounded px-2 py-2"
            />
          </div>

          <div>
            <Label>Nombres:</Label>
            <Input name="nombres" value={formData.nombres} onChange={handleChange} />
          </div>

          <div>
            <Label>Número de Documento:</Label>
            <Input
                name="numDocumento"
                value={formData.numDocumento}
                onChange={handleChange}
                required
            />
          </div>

          <div>
            <Label>Apellidos:</Label>
            <Input name="apellidos" value={formData.apellidos} onChange={handleChange} />
          </div>

          <div>
            <Label>Fecha de Nacimiento:</Label>
            <Input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Sexo:</Label>
              <Input name="genero" value={formData.genero} onChange={handleChange} />
            </div>
            <div>
              <Label>Estado Civil:</Label>
              <Input name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} />
            </div>
            <div>
              <Label>Grupo Sanguíneo:</Label>
              <Input name="grupoSanguineo" value={formData.grupoSanguineo} onChange={handleChange} />
            </div>
          </div>

          <div className="col-span-2">
            <Label>Domicilio:</Label>
            <Input name="direccion" value={formData.direccion} onChange={handleChange} />
          </div>

          <div>
            <Label>Teléfono:</Label>
            <Input name="telefono" value={formData.telefono} onChange={handleChange} />
          </div>
          <div>
            <Label>Correo Electrónico:</Label>
            <Input name="correo" value={formData.correo} onChange={handleChange} />
          </div>

          <div className="col-span-2">
            <Label>Antecedentes Familiares:</Label>
            <Input name="antecedentesFamiliares" value={formData.antecedentesFamiliares} onChange={handleChange} />
          </div>

          <div className="col-span-2">
            <h3 className="text-lg font-medium mt-4">Contacto de Emergencia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input name="nombres" placeholder="Nombres" value={formData.contactosEmergencia[0].nombres} onChange={handleEmergenciaChange} />
              <Input name="apellidos" placeholder="Apellidos" value={formData.contactosEmergencia[0].apellidos} onChange={handleEmergenciaChange} />
              <Input name="parentesco" placeholder="Parentesco" value={formData.contactosEmergencia[0].parentesco} onChange={handleEmergenciaChange} />
              <Input name="direccion" placeholder="Dirección" value={formData.contactosEmergencia[0].direccion} onChange={handleEmergenciaChange} />
              <Input name="telefonoPrincipal" placeholder="Tel. Principal" value={formData.contactosEmergencia[0].telefonoPrincipal} onChange={handleEmergenciaChange} />
              <Input name="telefonoSecundario" placeholder="Tel. Secundario" value={formData.contactosEmergencia[0].telefonoSecundario} onChange={handleEmergenciaChange} />
            </div>
          </div>

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
                onClick={() => navigate('/nuevo-episodio', {
                  state: { 
                    historiaClinicaId: "123" 
                  }
          })}
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