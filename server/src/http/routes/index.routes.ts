import { Router } from "express";
import { createGoalsController } from "../controllers/createGoals.controller";
import { listPendingGoalsCreatedUpToWeek } from "../controllers/list_pending_goals";

export const router = Router();

router.get('/pending-goals', [
  listPendingGoalsCreatedUpToWeek,
]);
router.post('/goals', [
  createGoalsController,
])



