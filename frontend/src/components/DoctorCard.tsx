import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Tipo para la versión informativa
interface DoctorInfo {
  name: string;
  specialty: string;
  email: string;
  location: string;
}

interface DoctorCardProps {
  doctor?: DoctorInfo;
  onSpecialtyChange?: (value: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSpecialtyChange }) => {
  return (
    <div className="w-full py-4">
      <Card className="border border-gray-300 shadow-md rounded-2xl overflow-hidden w-full py-0">
        <CardContent className="p-0">
          <div className="text-center text-xl font-bold text-gray-800 border-b px-8 py-5 bg-white">
            Información Personal
          </div>

          {/* Versión Final */}
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-8 px-8 py-5 text-base bg-white">
            <div><span className="font-semibold">Nombre:</span> {doctor?.name}</div>
            <div><span className="font-semibold">Especialidad:</span> {doctor?.specialty}</div>
            <div><span className="font-semibold">Correo:</span> {doctor?.email}</div>
            <div><span className="font-semibold">Sede:</span> {doctor?.location}</div>
          </div>

          {/* ✅ VERSIÓN 2: Editable */}
          {/*
          <div className="grid grid-cols-2 gap-y-3 gap-x-8 px-8 py-5 text-base bg-white">
            <div><span className="font-semibold">Nombre:</span> Veronika Elizabeth Rios Cuadros</div>
            <div className="flex flex-col">
              <Label className="font-semibold mb-1">Especialidad:</Label>
              <Select onValueChange={onSpecialtyChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Psicología">Psicología</SelectItem>
                  <SelectItem value="Odontología">Odontología</SelectItem>
                  <SelectItem value="Oftalmología">Oftalmología</SelectItem>
                  <SelectItem value="Nutrición">Nutrición</SelectItem>
                  <SelectItem value="Trabajo Social">Trabajo Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><span className="font-semibold">Correo:</span> vrioscua@unsa.edu.pe</div>
            <div><span className="font-semibold">Sede:</span> Ingenierías</div>
          </div>
          */}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorCard;
