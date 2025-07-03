import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // Asegúrate de tener este contexto
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Simulación de autenticación - reemplazar con llamada real a tu API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de red

      // Determinar rol basado en el correo electrónico
      let role: 'doctor' | 'enfermeria' | 'admin' = 'doctor'; // Valor por defecto
      
      if (email.endsWith('@doctor.unsa.edu.pe')) {
        role = 'doctor';
      } else if (email.endsWith('@enfermeria.unsa.edu.pe')) {
        role = 'enfermeria';
      } else if (email.endsWith('@admin.unsa.edu.pe')) {
        role = 'admin';
      }

      // Validar credenciales (en una app real, esto se haría en el backend)
      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Simular datos del usuario autenticado
      const userData = {
        id: '123',
        name: email.split('@')[0],
        email,
        role
      };

      // Establecer el usuario en el contexto de autenticación
      login(userData);

      // Redirigir según el rol
      switch(role) {
        case 'doctor':
          navigate("/inicio-doctor");
          break;
        case 'enfermeria':
          navigate("/inicio-enfermeria");
          break;
        case 'admin':
          navigate("/inicio-admin");
          break;
        default:
          navigate("/inicio-doctor");
      }

    } catch (err) {
      console.error('Error de autenticación:', err);
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <Card className="shadow-lg py-6">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-center">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-center">
            Bienvenido al Sistema de Salud de la UNSA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 py-6">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="usuario@unsa.edu.pe"
                  required
                  className="h-10"
                />
                <p className="text-xs text-gray-500">
                  Ejemplos: doctor@doctor.unsa.edu.pe, enfermera@enfermeria.unsa.edu.pe, admin@admin.unsa.edu.pe
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input 
                  id="password"
                  name="password" 
                  type="password" 
                  required 
                  className="h-10"
                  minLength={6}
                />
              </div>
              <div className="space-y-3 pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-10"
                  disabled={isLoading}
                >
                  {isLoading ? "Ingresando..." : "Ingresar"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-10"
                  type="button"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Continuar con Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}