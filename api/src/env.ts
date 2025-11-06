import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  AI_SERVICE_ENDPOINT: str({ default: '' }),
  AI_SERVICE_KEY: str({ default: '' }),
  JWT_AUDIENCE: str({ default: '' }),
  JWT_ISSUER: str({ default: '' }),
  CORS_ORIGINS: str({ default: 'http://localhost:3000' })
});
