// Description: This file contains the routes for the product.
import express from "express";
import {
  searchForProducts,
  // getImage,
  gettingDataForCarusel,
  getDataForListProductIphone,
  getDataForListProductAirPods,
  getDataForListProductAppleWatch,
  getDataForListProductMacbook,
  getDataForListProductIpad,
  getDataForListProductConsole,
  extractDataByid,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/SearchForProducts", searchForProducts);
router.post("/ExtractData/:id", extractDataByid);

router.get("/GetDataForListProduct/Iphone", getDataForListProductIphone);
router.get("/GetDataForListProduct/AirPods", getDataForListProductAirPods);
router.get("/GetDataForListProduct/AppleWatch", getDataForListProductAppleWatch);
router.get("/GetDataForListProduct/Macbook", getDataForListProductMacbook);
router.get("/GetDataForListProduct/Ipad", getDataForListProductIpad);
router.get("/GetDataForListProduct/Console", getDataForListProductConsole);

// router.get("/GetImage/:ImageName", getImage);
router.get("/GettingDataForCarusel", gettingDataForCarusel);

export default router;
