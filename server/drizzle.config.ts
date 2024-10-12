import { defineConfig } from 'drizzle-kit';
import { _env } from './src/env';
export default defineConfig({
  out: './migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: _env.DATABASE_URL,
  },
});