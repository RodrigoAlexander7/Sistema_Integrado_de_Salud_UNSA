import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps{
   children : ReactNode;
}

export const ProtectRoute = ({children}: ProtectedRouteProps) => {
   const {loading, isAuthenticated} = useAuth()
   console.log(loading,'abc', isAuthenticated)
   if(loading) return (<p>Cargando...</p>)
   
   return isAuthenticated? children : <Navigate to={'/'} replace />      
} 