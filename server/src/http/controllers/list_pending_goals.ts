import { response } from 'express';
import { getWeekPendingGoals } from '../services/get-week-pending-goals';

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
};

export type TypedResponse = typeof response;

export const listPendingGoalsCreatedUpToWeek = async (
  request: TypedRequestBody<{ title: string, desiredWeeklyFrequency: number; }>,
  response: TypedResponse
) => {
  try {
    const sql = await getWeekPendingGoals();
    response.send(sql);
  } catch (err) {
    response.status(400).send(
      'Invalid syntax: \r\nThe request message may contain incorrect or malformed syntax.'
    );
    throw err;
  }
}; 