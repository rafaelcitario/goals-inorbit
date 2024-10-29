import { Router } from "express";
import { createGoalsController } from "../controllers/createGoals.controller";

export const router = Router();
router.post('/goals', [
  createGoalsController,
])



