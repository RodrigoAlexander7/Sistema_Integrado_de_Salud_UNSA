export interface VitalSigns {
  bloodPressure?: string | null;       // presionArterial (String?)
  temperature?: number | null;        // temperatura (Decimal?)
  heartRate?: number | null;          // frecuenciaCardiaca (Int?)
  respiratoryRate?: number | null;    // frecuenciaRespiratoria (Int?)
  oxygenSaturation?: number | null;   // saturacionOxigeno (Decimal?)
  weight?: number | null;             // peso (Decimal?)
  height?: number | null;             // altura (Decimal?)
  bmi?: number | null;                // imc (Decimal?)
  registrationDate?: Date;            // fechaRegistro (DateTime)
}

export interface Patient {
  id: number;                         // id (Int)
  documentType: string;               // tipoDocumento (String)
  documentNumber: string;             // numDocumento (String)
  firstName: string;                  // nombres (String)
  lastName: string;                   // apellidos (String)
  birthDate: Date;                    // fechaNacimiento (DateTime)
  gender: string;                     // genero (String)
  bloodType?: string | null;          // grupoSanguineo (String?)
  allergies?: string | null;          // alergias (String?)
  vitalSigns: VitalSigns;             // Relación con SignosVitales
  datosOftalmologicos?: DatosOftalmologicos;
  datosOdontologicos?: DatosOdontologicos;
}

export interface DiagnosisRequest {
  patientId: number;                  // id del paciente (Int)
  specialty: string;                  // especialidad (String)
  episodeId?: number;                 // id del episodio clínico (Int)
}

export interface DiagnosisResponse {
  success: boolean;
  episodeId: number;                  // id del nuevo episodio (Int)
  clinicalRecordId: number;           // id de la historia clínica (Int)
}

export interface DatosOftalmologicos {
  agudezaVisual: {
    sinCorreccion: {
      odLejos: string;
      odCerca: string;
      oiLejos: string;
      oiCerca: string;
    };
    conCorreccion: {
      odLejos: string;
      odCerca: string;
      oiLejos: string;
      oiCerca: string;
      lentesOd: string;
      lentesOi: string;
    };
  };
  refraccion: {
    odEsfera: string;
    odCilindro: string;
    odEje: string;
    odAv: string;
    oiEsfera: string;
    oiCilindro: string;
    oiEje: string;
    oiAv: string;
  };
  presionIntraocular: {
    odValor: string;
    odHora: string;
    odMetodo: string;
    oiValor: string;
    oiHora: string;
    oiMetodo: string;
  };
  motilidadOcular: {
    derechaOd: string;
    derechaOi: string;
    izquierdaOd: string;
    izquierdaOi: string;
    arribaOd: string;
    arribaOi: string;
    abajoOd: string;
    abajoOi: string;
  };
  observaciones: string;
}

export type DienteCondicion = 
  | "sano" 
  | "caries" 
  | "restauracion" 
  | "ausente" 
  | "sellante" 
  | "corona" 
  | "movilidad" 
  | "fractura";

export interface DienteEstado {
  numero: number;
  condicion: DienteCondicion;
  observaciones: string;
}

export interface Tratamiento {
  fecha: string;
  diente: number;
  procedimiento: string;
  observaciones: string;
}

export interface DatosOdontologicos {
  condiciones: Record<number, DienteEstado>;
  tratamientos: Tratamiento[];
}

