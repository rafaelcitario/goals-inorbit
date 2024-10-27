import { Router } from "express";
import { createRoute } from "./create_routes/create.routes";
export const router = Router();
router.post('/new', [
  createRoute,
])



