import { useEffect, useState } from "react";

export function TestConection(){
   const [mensaje, setMensaje] = useState<{status:string} | null >(null);

   useEffect(()=>{
      const fetchData = async ()=>{
         try {
            const res = await fetch('http://localhost:4000/api/health');
            const data = await res.json();
            setMensaje(data)
            console.log(data);
         } catch (error) {
            console.error('Error al obtener datos');
         }
      }
      fetchData();
   },[]);

   return(
      <div>
         <h1>
            {mensaje? mensaje.status:"Cargando"}
         </h1>
      </div>
   )
}