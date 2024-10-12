import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url()
});

const ENV = envSchema.safeParse(process.env);
if (ENV.success === false) {
  const errorMessage = 'please, check variable environment, something was wrong!';
  console.log(errorMessage, ENV.error.format());
  throw new Error(errorMessage);
}

export const _env = ENV.data; 