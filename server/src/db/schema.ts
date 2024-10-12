import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const goalsTable = pgTable('goals', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const completedGoals = pgTable('completed_goals', {
  id: text('completed_goals_id').primaryKey().notNull(),
  goalId: text('goal_id').references(() => goalsTable.id).notNull(),
  title: text('completed_goals_title').notNull(),
  completedAt: timestamp('completed_goals_at', { withTimezone: true }).notNull().defaultNow()
});