import { expressjwt as jwt } from 'express-jwt';
import jwks from 'jwks-rsa';
import { config } from './environment';

// jwCheck es un middleware que exportaremos para la capa de /middleware  
export const jwtCheck = jwt({
  // usamos la clave publica de jwt
  secret: jwks.expressJwtSecret({
    cache: true,        // la almacenamos en memoria cache  
    rateLimit: true,
    jwksRequestsPerMinute: 5, // limita las solicitudes a 5 por minuto
    jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`
  }),

  // identificador que llama a nuestro backend
  audience: config.auth0.audience,

  // identificador del que emite el token (auth0)
  issuer: config.auth0.issuerBaseURL, 
  algorithms: ['RS256']
});