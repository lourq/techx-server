// Description: This file contains the routes for the order related operations.
import express from "express";
import {
  createOrder,
  getOrderHistory,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/CreateOrder", createOrder);
router.post("/GetOrderHistory", getOrderHistory);

export default router;
