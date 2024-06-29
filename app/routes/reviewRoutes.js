// Description: This file contains the routes for the session.
import express from "express";
import {
  sendProductReview,
  getProductReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Routes for session controller
router.post("/SendProductReview", sendProductReview);
router.post("/GetProductReview/:id", getProductReview);

export default router;
