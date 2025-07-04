import { auth } from 'express-oauth2-jwt-bearer'; // or your auth0 middleware
import { Request, Response, NextFunction } from 'express';
import {config} from '../config/environment'

// Middleware para copear el token de la cookie a auth0
function cookieJwtToAuthHeader(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.authToken;
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  next();
}

const jwtCheck = [
  cookieJwtToAuthHeader,
  auth({
    audience: config.auth0.audience,
    issuerBaseURL: config.auth0.issuerBaseURL,
    tokenSigningAlg: 'RS256'
  })
];

export default jwtCheck;