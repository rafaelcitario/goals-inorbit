import { client, database } from './index';
import { completedGoals, goals } from './schema';


export async function seed (): Promise<void> {
  await database.delete(goals);
  await database.delete(completedGoals);
  const databaseTasks = await database.insert(goals).values([
    { title: 'acordar as 05h da manhã', desiredWeeklyFrequency: 5 },
    { title: 'Pegar o onibus das 11h50', desiredWeeklyFrequency: 5 },
    { title: 'Comprar uma rosquinha do cara da moto do pão', desiredWeeklyFrequency: 1 },
  ]).returning();


  await database.insert(completedGoals).values([
    { goalId: databaseTasks[0].id, title: databaseTasks[0].title, completedAt: new Date() },
    { goalId: databaseTasks[1].id, title: databaseTasks[1].title, completedAt: new Date() },
  ]);


}

seed().finally(() => client.end());