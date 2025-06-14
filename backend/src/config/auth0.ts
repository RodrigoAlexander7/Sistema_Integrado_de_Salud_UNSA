import { expressjwt as jwt } from 'express-jwt';
import jwks from 'jwks-rsa';
import { config } from './environment';

export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`
  }),
  audience: config.auth0.audience,
  issuer: config.auth0.issuerBaseURL,
  algorithms: ['RS256']
});