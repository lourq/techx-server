// Description: This file contains the routes for the session.
import express from "express";
import {
  generateToken,
  checkToken,
  createSession,
  pullOutOfSession,
  removeFromSession,
} from "../controllers/sessionController.js";

const router = express.Router();

// Routes for session controller
router.post("/GenerateToken", generateToken);
router.post("/CheckToken", checkToken);
router.post("/CreateSession", createSession);
router.post("/PullOutOfSession", pullOutOfSession);
router.post("/RemoveFromSession", removeFromSession);

export default router;
