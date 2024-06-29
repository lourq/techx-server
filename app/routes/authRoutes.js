// Description: This file implements the routes for the authentication controller
import express from "express";
import {
  checkUserExists,
  sendConfirmationCodeEmail,
  newUser,
  proofPass,
} from "../controllers/authController.js";

const router = express.Router();

// Routes for auth controller
router.post("/CheckUserExists", checkUserExists);
router.post("/SendConfirmationCodeEmail", sendConfirmationCodeEmail);
router.post("/NewUser", newUser);
router.post("/ProofPass", proofPass);

export default router;
