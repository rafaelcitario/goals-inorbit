import { and, count, gte, lte } from "drizzle-orm";
import { database } from "../../db";
import { completedGoals, goals } from "../../db/schema";
import dayjs from "dayjs";

export async function getWeekPendingGoals () {
  const firstDayOfWeek: Date = dayjs().startOf('week').toDate();
  const lastDayOfWeek: Date = dayjs().endOf('week').toDate();

  // CTE para metas criadas até o final da semana
  const goalsCreatedUpToWeek = database.$with('goals_created_up_to_week').as(
    database.select({
      id: goals.id,
      title: goals.title,
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      createdAt: goals.createdAt,
    }).from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  );

  // CTE para contagem de conclusões
  const goalsCompletionsCounts = database.$with('goals_completion_counts').as(
    database.select({
      goalsId: completedGoals.goalId,
      completionsCount: count(completedGoals.id).as('completionsCount'),
    }).from(completedGoals)
      .where(
        and(
          gte(completedGoals.completedAt, firstDayOfWeek),
          lte(completedGoals.completedAt, lastDayOfWeek)
        )
      )
      .groupBy(completedGoals.goalId)
  );

  // Consulta final juntando as duas CTEs
  // const result = await database
  //   .with(goalsCreatedUpToWeek, goalsCompletionsCounts)
  //   .select({
  //     id: goalsCreatedUpToWeek.id,
  //     title: goalsCreatedUpToWeek.title,
  //     desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
  //     createdAt: goalsCreatedUpToWeek.createdAt,
  //     completionsCount: goalsCompletionsCounts.completionsCount.default(0) // Para garantir que não retorne NULL
  //   })
  //   .from(goalsCreatedUpToWeek)
  //   .leftJoin(goalsCompletionsCounts, goalsCompletionsCounts.goalsId.eq(goalsCreatedUpToWeek.id))
  //   .toSQL();

  const result = await database
    .with(goalsCompletionsCounts, goalsCreatedUpToWeek)
    .select()
    .from(goalsCompletionsCounts).where(
      and(
        gte(goalsCompletionsCounts.goalsId, firstDayOfWeek),
        lte(goalsCompletionsCounts.goalsId, lastDayOfWeek)
      ));


  return result;
}
