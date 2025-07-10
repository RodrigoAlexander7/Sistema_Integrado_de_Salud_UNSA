import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { File } from "lucide-react";
import TitleCard from "@/components/TitleCard";

const especialidadesMap: { [key: string]: number } = {
  "Trabajo Social": 1,
  "Odontología": 2,
  "Psicología": 3,
  "Oftalmología": 4,
  "Nutrición": 5,
  "Medicina General": 6, // Añade si quieres
};

const TriajePaciente: React.FC = () => {
  const navigate = useNavigate();

  // Estados para inputs
  const [nombre, setNombre] = useState("");
  const [cui, setCui] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [presionArterial, setPresionArterial] = useState("");
  const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState("");
  const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = useState("");
  const [saturacionOxigeno, setSaturacionOxigeno] = useState("");
  const [peso, setPeso] = useState("");
  const [talla, setTalla] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Estos dos los definimos fijos por ahora, pero podrías recibirlos como props, contexto o select
  const enfermeraId = 1;
  const consultorioId = 1;

  const especialidades = Object.keys(especialidadesMap);

  const handleInicioEnf = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos mínimos
    if (
      !cui ||
      !especialidadSeleccionada ||
      !motivoConsulta ||
      !peso ||
      !talla ||
      !temperatura ||
      !presionArterial
    ) {
      alert("Por favor, complete los campos obligatorios.");
      return;
    }

    try {
      // Construir objeto para enviar
      const dataToSend = {
        tipoDocumento: "CUI", // Aquí podrías agregar un selector si manejas más tipos
        numDocumento: cui,
        especialidadId: especialidadesMap[especialidadSeleccionada],
        medicoId: undefined, // si tienes, asignar aquí
        enfermeraId,
        consultorioId,
        fechaEpisodio: new Date().toISOString(),
        motivoConsulta,
        sintomas,
        tratamiento: undefined, // si tienes input para tratamiento, asignar aquí
        observaciones: undefined, // igual que tratamiento
        signosVitales: {
          peso: parseFloat(peso),
          altura: parseFloat(talla),
          temperatura: parseFloat(temperatura),
          presionArterial,
          frecuenciaCardiaca: frecuenciaCardiaca ? parseInt(frecuenciaCardiaca) : null,
          frecuenciaRespiratoria: frecuenciaRespiratoria ? parseInt(frecuenciaRespiratoria) : null,
          saturacionOxigeno: saturacionOxigeno ? parseFloat(saturacionOxigeno) : null,
        },
      };

      const response = await fetch("http://localhost:4000/api/episodios/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <-- necesario para enviar la cookie con el token
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            errorData = { error: "Error desconocido del servidor" };
        }
        alert("Error: " + (errorData.error || "No se pudo guardar"));
        return;
      }

      setMostrarAlerta(true);
      setTimeout(() => {
        setMostrarAlerta(false);
        navigate("/Inicio-Enfermeria");
      }, 3000);
    } catch (error) {
      alert("Error en la conexión al servidor.");
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      {mostrarAlerta && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-800 px-6 py-3 rounded shadow-md transition-opacity duration-500">
          Guardado exitosamente
        </div>
      )}

      <TitleCard title="Triaje de paciente" icon={<File className="h-8 w-8" />} />

      <div className="border-2 border-blue-400 p-6 rounded-md w-full max-w-5xl shadow-sm">
        <h2 className="text-xl font-semibold text-center mb-6">
          Ingreso de Datos Clínicos del Paciente
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" onSubmit={handleInicioEnf}>
          <div>
            <Label>Nombre:</Label>
            <Input
              type="text"
              placeholder="Nombre del paciente"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <Label>CUI:</Label>
            <Input
              type="number"
              placeholder="CUI del Paciente"
              value={cui}
              onChange={(e) => setCui(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Temperatura corporal (°C):</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="Ej. 36.5"
              value={temperatura}
              onChange={(e) => setTemperatura(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Presión arterial (mmHg):</Label>
            <Input
              type="text"
              placeholder="Ej. 120/80"
              value={presionArterial}
              onChange={(e) => setPresionArterial(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Frecuencia cardíaca (lpm):</Label>
            <Input
              type="number"
              placeholder="Ej. 75"
              value={frecuenciaCardiaca}
              onChange={(e) => setFrecuenciaCardiaca(e.target.value)}
            />
          </div>
          <div>
            <Label>Frecuencia respiratoria (rpm):</Label>
            <Input
              type="number"
              placeholder="Ej. 18"
              value={frecuenciaRespiratoria}
              onChange={(e) => setFrecuenciaRespiratoria(e.target.value)}
            />
          </div>

          <div>
            <Label>Saturación de oxígeno (%):</Label>
            <Input
              type="number"
              placeholder="Ej. 98"
              value={saturacionOxigeno}
              onChange={(e) => setSaturacionOxigeno(e.target.value)}
            />
          </div>

          <div>
            <Label>Peso (kg):</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="Ej. 70.5"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Talla (cm):</Label>
            <Input
              type="number"
              placeholder="Ej. 170"
              value={talla}
              onChange={(e) => setTalla(e.target.value)}
              required
            />
          </div>

          <div className="col-span-2">
            <Label>Motivo de la consulta:</Label>
            <Input
              type="text"
              placeholder="Ej. Dolor abdominal, revisión médica..."
              value={motivoConsulta}
              onChange={(e) => setMotivoConsulta(e.target.value)}
              required
            />
          </div>

          <div className="col-span-2">
            <Label>Síntomas:</Label>
            <Input
              type="text"
              placeholder="Ej. Náuseas, fiebre, dolor persistente..."
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <Label>Especialidad:</Label>
            <select
              value={especialidadSeleccionada}
              onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Seleccione una especialidad
              </option>
              {especialidades.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 flex justify-center mt-6">
            <Button
              type="submit"
              className="bg-blue-900 hover:bg-blue-700 text-white text-md px-6 py-2 rounded-lg"
            >
              Guardar Triaje
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TriajePaciente;
