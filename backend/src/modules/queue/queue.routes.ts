import { Router } from "express";
import {
  createQueue,
  generateToken,
  updateTokenStatus,
} from "./queue.controller.js";

const router = Router();

// queues
router.post("/", createQueue);

// tokens
router.post("/:queueId/tokens", generateToken);
router.patch("/tokens/:tokenId/status", updateTokenStatus);

export default router;
