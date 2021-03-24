export const FRONT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.gomi.land'
    : 'http://localhost:3000';

export const API_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.gomi.land'
    : 'http://localhost:4000';
