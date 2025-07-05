import type { NavigateFunction } from "react-router-dom";

export const handleLogout = async(navigate: NavigateFunction)=>{
   try{
      await fetch('http://localhost:4000/api/auth/logout',{
         method: 'POST',
         credentials: 'include'
      })
   }catch(error){
      console.error('Errror durante el logout', error)
   }finally{
      navigate('/')
   }
}