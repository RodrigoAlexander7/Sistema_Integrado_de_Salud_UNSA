import React from "react";
import { useTheme } from "@/context/ThemeContext";

const FichaEstudiante: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 px-1 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
        }`}>
            {/* Información personal */}
            <div className="md:col-span-2">
                <h2 className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                    Veronika Elizabeth, Rios Cuadros
                </h2>
                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                    <p>
                        <strong className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            Facultad:
                        </strong> Ingeniería de Producción
                    </p>
                    <p>
                        <strong className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            CUI:
                        </strong> 20248965
                    </p>
                    <p>
                        <strong className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            Escuela:
                        </strong> Ingeniería Industrial
                    </p>
                    <p>
                        <strong className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            DNI:
                        </strong> 78965491
                    </p>
                </div>
            </div>

            {/* Último examen físico */}
            <div>
                <h2 className={`text-md font-semibold text-right ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                    Último Examen Físico
                </h2>
                <div className={`text-sm text-right mt-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                    <p>
                        <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                            Peso
                        </strong> 57 Kg
                    </p>
                    <p>
                        <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                            Altura
                        </strong> 1.71
                    </p>
                    <p>
                        <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                            IMC
                        </strong> 18.1
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FichaEstudiante;