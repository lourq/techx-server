import dotenv from "dotenv";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import { _techx_data_connection_string } from "./serverdata/connect_db.js";
import __dirname from "./app/utils/dirnameUtil.js";

// Middlewares
import { extractToken } from "./middlewares/authMiddleware.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";

// Routes
import authRoutes from "./app/routes/authRoutes.js";
import sessionRoutes from "./app/routes/sessionRoutes.js";
import profileRoutes from "./app/routes/profileRoutes.js";
import productRoutes from "./app/routes/productRoutes.js";
import reviewRoutes from "./app/routes/reviewRoutes.js";
import favoriteRoutes from "./app/routes/favoriteRoutes.js";
import orderRoutes from "./app/routes/orderRoutes.js";

// API Routes
import apiProductRoutes from "./app/routes/api/productRoutes.js";
import apiOrderRoutes from "./app/routes/api/orderRoutes.js";
import apiActivityRoutes from "./app/routes/api/activityRoutes.js";

//  ████████╗███████╗ █████╗ ██╗  ██╗██╗  ██╗
//  ╚══██╔══╝██╔════╝██╔══██╗██║  ██║╚██╗██╔╝
//     ██║   █████╗  ██║  ╚═╝███████║ ╚███╔╝
//     ██║   ██╔══╝  ██║  ██╗██╔══██║ ██╔██╗
//     ██║   ███████╗╚█████╔╝██║  ██║██╔╝╚██╗
//     ╚═╝   ╚══════╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
//
//   ██████╗███████╗██████╗ ██╗   ██╗███████╗██████╗
//  ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
//  ╚█████╗ █████╗  ██████╔╝╚██╗ ██╔╝█████╗  ██████╔╝
//   ╚═══██╗██╔══╝  ██╔══██╗ ╚████╔╝ ██╔══╝  ██╔══██╗
//  ██████╔╝███████╗██║  ██║  ╚██╔╝  ███████╗██║  ██║
//  ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
//
// The TechX server file provides communication between the Compass products,
// the TechX Store, and the Database.

dotenv.config();
const app = express();

// Middlewares
app.use(express.json()); // Middleware parses incoming requests with JSON bodies.
app.use("/product/GetImage" , express.static(path.join(__dirname, '../../public/productImages')));

app.use(corsMiddleware);
app.use(extractToken);

// Routes
app.use("/auth", authRoutes);
app.use("/session", sessionRoutes);

app.use("/profile", profileRoutes);
app.use("/profile/favorite", favoriteRoutes);
app.use("/profile/order", orderRoutes);

app.use("/product", productRoutes);
app.use("/product/review", reviewRoutes);

app.use("/api/product", apiProductRoutes);
app.use("/api/order", apiOrderRoutes);
app.use("/api/activity", apiActivityRoutes);

const DB_URL = _techx_data_connection_string; // process.env.MONGODB_URI;
const PORT = 3000; // process.env.PORT;

const start = async () => {
  try {
    await mongoose.connect(DB_URL);

    console.log(`🔌 Connect is [${mongoose.connection.readyState}]`);

    const host = process.env.HOST || "localhost";
    const protocol = process.env.PROTOCOL || "http";
    const full_URL = `${protocol}://${host}:${PORT}`;

    app.listen(PORT, () => {
      console.log(`🍕 Server listening on port ${PORT} at ${full_URL}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();