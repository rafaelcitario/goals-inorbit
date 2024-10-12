import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

export const goalsTable = pgTable('goals', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});