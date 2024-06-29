// Description: This file contains the routes for the profile.
import express from "express";
import { changeProfileData } from "../controllers/profileController.js";

const router = express.Router();

router.post("/ChangeProfileData", changeProfileData);

export default router;
