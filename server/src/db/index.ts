import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '../env';


export const client = postgres(env.DATABASE_URL);
export const database = drizzle(client, { schema, logger: true });

