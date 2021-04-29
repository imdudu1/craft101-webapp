export const PRODUCTION_URL: string = 'https://craft101.juraffe.dev';

export const FRONT_SERVER_URL: string =
  process.env.NODE_ENV === 'production'
    ? PRODUCTION_URL
    : 'http://localhost:3000';

export const API_SERVER_URL: string =
  process.env.NODE_ENV === 'production'
    ? PRODUCTION_URL
    : 'http://localhost:4000';

export const MC_SERVER_DEFAULT_PORT: number = 25565;

export const JWT_KEY_NAME: string = 'x-jwt';
