export interface UsuarioDTO{
   id: number,
   usuarioId: number,
   tipoDocumento: string,
   numDocumento: string,
   nombres: string,
   apellidos: string,
   numLicencia: string,
   telefono: string,
   correo: string,
   fechaRegistro: string,
   activo: boolean,
   especialidades: any[] 
}