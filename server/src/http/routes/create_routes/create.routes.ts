import express from 'express';
export function createRoute (request: express.Request, response: express.Response, next: express.NextFunction): void {
  response.send('express.response');
}