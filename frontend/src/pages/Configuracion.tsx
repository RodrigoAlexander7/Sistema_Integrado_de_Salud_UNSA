// src/pages/Configuracion.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Settings } from "lucide-react";
import TitleCard from "@/components/TitleCard";
import { useTheme } from "@/context/ThemeContext";

const ConfiguracionPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full"> 
      {/* Contenido principal */}
        <main className="flex-1 min-w-0 pl-8 pr-8 py-4">
          <div className="w-full max-w-full">
            <TitleCard 
              title="Configuración del Sistema" 
              icon={<Settings className="h-8 w-8" />} 
            />

            {/* Tarjeta de Preferencias */}
            <div className="flex justify-center">
              <Card className={`w-full max-w-2xl shadow-xl rounded-xl ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white border-blue-50'
              }`}>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className={`text-2xl font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-blue-900'
                    }`}>
                      Preferencias de Visualización
                    </h2>
                    <p className={`mt-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Personaliza la apariencia del sistema
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-6">
                    <div className={`p-4 rounded-lg w-full text-center ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-blue-50'
                    }`}>
                      <h3 className={`font-medium mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-700'
                      }`}>
                        Seleccionar Tema
                      </h3>
                       
                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={toggleTheme}
                          className={`w-32 flex items-center justify-center gap-2 ${
                            theme === 'light'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                            }`}
                        >
                          <Sun className="h-4 w-4" />
                            Claro
                        </Button>
                        
                        <Button
                          onClick={toggleTheme}
                          className={`w-32 flex items-center justify-center gap-2 ${
                            theme === 'dark'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                          }`}
                        >
                          <Moon className="h-4 w-4" />
                          Oscuro
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </main>
    </div>
  );
};

export default ConfiguracionPage;