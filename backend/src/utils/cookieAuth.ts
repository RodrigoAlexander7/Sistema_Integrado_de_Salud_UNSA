import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para tomar el token JWT desde una cookie (ej: 'authToken')
 * y colocarlo en el encabezado 'Authorization' para que express-jwt lo pueda procesar.
 */
export function tokenFromCookieToHeader(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.authToken;
  //console.log('just work fuck' ,req)
  console.log("hola ", req.cookies)
  console.log("hola ", req.cookies.authToken)
  console.log('ahola' , token)
  // Si existe el token en la cookie y no hay ya un header de autorización, lo establecemos.
  if (token && !req.headers.authorization) {
    req.headers.authorization = `Bearer ${token}`;
  }

  next(); // Pasamos al siguiente middleware en la cadena (que será jwtCheck)
}