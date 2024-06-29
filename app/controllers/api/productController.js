import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import __dirname from "../../utils/dirnameUtil.js"

// Models
import { IPhoneModel } from "../../models/Iphone.js";
import { MacbookModel } from "../../models/Macbook.js";
import { IpadModel } from "../../models/Ipad.js";
import { AirPodsModel } from "../../models/AirPods.js";
import { AppleWatchModel } from "../../models/AppleWatch.js";
import { ConsoleModel } from "../../models/Console.js";
import { ProductActivityModel } from "../../models/ProductActivity.js";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/productImages"));
  },
  filename: (req, file, cb) => {
    const unique_suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${unique_suffix}-${file.originalname}`;

    cb(null, fileName);
  },
});

export const upload = multer({ storage });

// Add new product image to server and return image names
export const addNewProductImg = async (req, res) => {
  upload.array("image", 5)
  try {
    const uploaded_files = req.files;
    console.log(uploaded_files);
    if (!uploaded_files || uploaded_files.length === 0)
      return res.status(400).json({ message: "No files uploaded" });

    const file_names = uploaded_files.map((file) => file.filename);

    res
      .status(200)
      .json({ message: "Images uploaded successfully", file_names });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(400).json({ message: "Internal Server Error" });
  }
}

// Add product to database with image names and return success message
export const addProduct = async (req, res) => {
  const new_p = req.body;
  let new_product;
  const arr_color = [];

  arr_color.push(new_p.product.color);

  try {
    switch (new_p.product.category) {
      case "iPhone":
        new_product = new IPhoneModel({
          _id: new mongoose.Types.ObjectId(),
          category: new_p.product.category,
          brand: new_p.product.brand,
          model: new_p.product.model,
          price: new_p.product.price,
          descont_price: new_p.product.descont_price ?? 0,
          color: new_p.product.color,
          memory: new_p.product.memory,
          displaySize: new_p.product.display_size,
          description: new_p.product.description,
          os: new_p.product.os,
          battery: new_p.product.battery,
          camera: new_p.product.camera,
          processor: new_p.product.processor,
          images: new_p.server_img,
          incarousel: new_p.product.incarousel,
        });
        break;
      case "Macbook":
        new_product = new MacbookModel({
          _id: new mongoose.Types.ObjectId(),
          category: new_p.product.category,
          brand: new_p.product.brand,
          model: new_p.product.model,
          price: new_p.product.price,
          descont_price: new_p.product.descont_price ?? 0,
          color: new_p.product.color,
          memory: new_p.product.memory,
          displaySize: new_p.product.display_size,
          description: new_p.product.description,
          os: new_p.product.os,
          camera: new_p.product.camera,
          processor: new_p.product.processor,
          battery: new_p.product.battery,
          RAM: new_p.product.RAM,
          CPU: new_p.product.CPU,
          GPU: new_p.product.GPU,
          images: new_p.server_img,
          incarousel: new_p.product.incarousel,
        });
        break;
      case "Ipad":
        new_product = new IpadModel({
          _id: new mongoose.Types.ObjectId(),
          category: new_p.product.category,
          brand: new_p.product.brand,
          model: new_p.product.model,
          price: new_p.product.price,
          descont_price: new_p.product.descont_price ?? 0,
          color: arr_color,
          memory: new_p.product.memory,
          displaySize: new_p.product.display_size,
          description: new_p.product.description,
          os: new_p.product.os,
          camera: new_p.product.camera,
          processor: new_p.product.processor,
          battery: new_p.product.battery,
          RAM: new_p.product.RAM,
          CPU: new_p.product.CPU,
          GPU: new_p.product.GPU,
          images: new_p.server_img,
          incarousel: new_p.product.incarousel,
        });
        break;
      case "AirPods":
        new_product = new AirPodsModel({
          _id: new mongoose.Types.ObjectId(),
          category: new_p.product.category,
          brand: new_p.product.brand,
          model: new_p.product.model,
          price: new_p.product.price,
          descont_price: new_p.product.descont_price ?? 0,
          processor: new_p.product.processor,
          color: new_p.product.color,
          description: new_p.product.description,
          battery: new_p.product.battery,
          images: new_p.server_img,
          incarousel: new_p.product.incarousel,
        });
        break;
      case "Watch":
        new_product = new AppleWatchModel({
          _id: new mongoose.Types.ObjectId(),
          category: new_p.product.category,
          brand: new_p.product.brand,
          model: new_p.product.model,
          price: new_p.product.price,
          descont_price: new_p.product.descont_price ?? 0,
          color: arr_color,
          memory: new_p.product.memory,
          displaySize: new_p.product.display_size,
          description: new_p.product.description,
          os: new_p.product.os,
          processor: new_p.product.processor,
          battery: new_p.product.battery,
          RAM: new_p.product.RAM,
          CPU: new_p.product.CPU,
          GPU: new_p.product.GPU,
          images: new_p.server_img,
          incarousel: new_p.product.incarousel,
        });
        break;
      case "Console":
        new_product = new ConsoleModel({
          _id: new mongoose.Types.ObjectId(),
          category: new_p.product.category,
          brand: new_p.product.brand,
          model: new_p.product.model,
          price: new_p.product.price,
          descont_price: new_p.product.descont_price ?? 0,
          color: arr_color,
          memory: new_p.product.memory,
          description: new_p.product.description,
          os: new_p.product.os,
          processor: new_p.product.processor,
          RAM: new_p.product.RAM,
          CPU: new_p.product.CPU,
          GPU: new_p.product.GPU,
          images: new_p.server_img,
          incarousel: new_p.product.incarousel,
        });
        break;
      default:
        break;
    }

    await new_product.save();

    res.status(200).json({ message: `${new_p.product.category} added successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Remove product from database and delete images from server and return success message
export const removeProductFromDB = async (req, res) => {
  const { category, model } = req.body;

  try {
    let product_model;

    switch (category) {
      case "iPhone":
        product_model = IPhoneModel;
        break;
      case "Macbook":
        product_model = MacbookModel;
        break;
      case "Ipad":
        product_model = IpadModel;
        break;
      case "AirPods":
        product_model = AirPodsModel;
        break;
      case "Watch":
        product_model = AppleWatchModel;
        break;
      case "Console":
        product_model = ConsoleModel;
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid product category" });
      }

    const result = await product_model.findOneAndDelete({ model: model });
    const image_paths = result.images;

    image_paths.forEach((image) => {
      const full_path = path.join(__dirname, "../../public/productImages", image);

      fs.access(full_path, fs.constants.F_OK, (err) => {
        if (err) console.error(`Image not found: ${full_path}`);
        else {
          fs.unlink(full_path, (err) => {
            if (err) console.error(`Error deleting image: ${full_path}`, err);
          });
        }
      });
    });

    await ProductActivityModel.deleteMany({ product_id: result._id });

    if (result)
      res
        .status(200)
        .json({ success: true, message: "Product removed successfully" });
    else res.status(404).json({ success: false, message: "Product not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}