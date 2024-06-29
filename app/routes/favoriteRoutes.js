// Description: This file contains the routes for the favorite products.
import express from "express";
import {
  addFavoriteProduct,
  deleteFavoriteProduct,
  getFavoriteProduct,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/AddFavoriteProduct/:id", addFavoriteProduct);
router.post("/DeleteFavoriteProduct/:id", deleteFavoriteProduct);
router.get("/GetFavoriteProduct/:id", getFavoriteProduct);

export default router;
