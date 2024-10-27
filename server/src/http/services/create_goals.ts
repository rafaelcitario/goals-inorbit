import { database as dataBase } from "../../db";
import { goals } from "../../db/schema";

type CreateGoalsParametersType = {
  title: string,
  desiredWeeklyFrequency: number;
};

export async function createGoals ({ title, desiredWeeklyFrequency }: CreateGoalsParametersType): Promise<object> {
  const insertData = await dataBase.insert(goals).values({
    title,
    desiredWeeklyFrequency
  }).returning();

  const goal = await insertData[0];
  return {
    goal
  };
}