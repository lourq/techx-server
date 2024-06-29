import mongoose from "mongoose";

// Models
import {SessionModel} from "../models/Session.js";
import {ProductActivityModel} from "../models/ProductActivity.js";
import {UserModel} from "../models/User.js";
import {IPhoneModel} from "../models/Iphone.js";
import {AirPodsModel} from "../models/AirPods.js";
import {AppleWatchModel} from "../models/AppleWatch.js";
import {MacbookModel} from "../models/Macbook.js";
import {IpadModel} from "../models/Ipad.js";
import {ConsoleModel} from "../models/Console.js";

// Add a product to the user's favorites
export const addFavoriteProduct = async (req, res) => {
  try {
    const token = req.token;
    const session = await SessionModel.findOne({ token });
    const product_object_id = new mongoose.Types.ObjectId(req.params.id);

    if (req.params.id !== null) {
      const p_id = await ProductActivityModel.findOne({
        product_id: req.params.id,
      });

      if (p_id) {
        p_id.number_favorites++;

        await p_id.save();
      }
    }

    if (session) {
      const user = await UserModel.findOne({ _id: session.user_id });

      user.favourites.push(product_object_id);
      await user.save();
      res.status(200).json({ message: "Product added to favourites" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to favourites" });
  }
};

// Delete a product from the user's favorites
export const deleteFavoriteProduct = async (req, res) => {
  try {
    const token = req.token;
    const session = await SessionModel.findOne({ token });
    const product_object_id = new mongoose.Types.ObjectId(req.params.id);

    if (session) {
      if (req.params.id !== null) {
        const p_id = await ProductActivityModel.findOne({
          product_id: req.params.id,
        });

        if (p_id) {
          p_id.number_favorites--;

          await p_id.save();
        }
      }

      const user = await UserModel.findOne({ _id: session.user_id });
      const index_f = user.favourites.indexOf(product_object_id);

      if (index_f === -1)
        return res
          .status(400)
          .json({ message: "Product not found in favourites" });

      user.favourites.splice(index_f, 1);
      await user.save();
      res.status(200).json({ message: "Product removed from favourites" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing product from favourites" });
  }
};

// Get a product from the user's favorites
export const getFavoriteProduct = async (req, res) => {
  try {
    const product_object_id = new mongoose.Types.ObjectId(req.params.id);
    const iphone_data = await IPhoneModel.findById(product_object_id);

    if (iphone_data) {
      res.status(200).json({
        id: iphone_data.id,
        images: iphone_data.images[0],
        model: iphone_data.model,
        price: iphone_data.price,
      });
      return;
    }

    const airpod_data = await AirPodsModel.findById(product_object_id);

    if (airpod_data) {
      res.status(200).json({
        id: airpod_data.id,
        images: airpod_data.images[0],
        model: airpod_data.model,
        price: airpod_data.price,
      });
      return;
    }

    const applewatch_data = await AppleWatchModel.findById(product_object_id);

    if (applewatch_data) {
      res.status(200).json({
        id: applewatch_data.id,
        images: applewatch_data.images[0],
        model: applewatch_data.model,
        price: airpod_data.price,
      });
      return;
    }

    const macbook_data = await MacbookModel.findById(product_object_id);

    if (macbook_data) {
      res.status(200).json({
        id: macbook_data.id,
        images: macbook_data.images[0],
        model: macbook_data.model,
        price: macbook_data.price,
      });
      return;
    }

    const ipad_data = await IpadModel.findById(product_object_id);

    if (ipad_data) {
      res.status(200).json({
        id: ipad_data.id,
        images: ipad_data.images[0],
        model: ipad_data.model,
        price: ipad_data.price,
      });
      return;
    }

    const console_data = await ConsoleModel.findById(product_object_id);

    if (console_data) {
      res.status(200).json({
        id: console_data.id,
        images: console_data.images[0],
        model: console_data.model,
        price: console_data.price,
      });
      return;
    } else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting product from favourites" });
  }
};
