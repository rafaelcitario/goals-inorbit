import { response } from 'express';
import { createGoals } from '../services/create_goals';

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
};

export type TypedResponse = typeof response;

export const createGoalsController = async (
  request: TypedRequestBody<{ title: string, desiredWeeklyFrequency: number; }>,
  response: TypedResponse
) => {

  const body = request.body;
  try {
    await createGoals({
      title: body.title,
      desiredWeeklyFrequency: body.desiredWeeklyFrequency
    }).then(() => {
      response.status(200).send('Created with Success');
    });
  } catch (err) {
    response.status(400).send(
      'Invalid syntax: \r\nThe request message may contain incorrect or malformed syntax.'
    );
    throw err;
  }
}; 