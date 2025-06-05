import React from "react";

const FichaEstudiante: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Información personal */}
        <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">Veronika Elizabeth, Rios Cuadros</h2>
            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <p><strong>Facultad:</strong> Ingeniería de Producción</p>
            <p><strong>CUI:</strong> 20248965</p>
            <p><strong>Escuela:</strong> Ingeniería Industrial</p>
            <p><strong>DNI:</strong> 78965491</p>
            </div>
        </div>

        {/* Último examen físico */}
        <div>
            <h2 className="text-md font-semibold text-right">Último Examen Físico</h2>
            <div className="text-sm text-right mt-2">
            <p><strong>Peso</strong> 57 Kg</p>
            <p><strong>Altura</strong> 1.71</p>
            <p><strong>IMC</strong> 18.1</p>
            </div>
        </div>
        </div>
    );
};

export default FichaEstudiante;
