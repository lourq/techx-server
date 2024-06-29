import mongoose from "mongoose";

// Models
import { IPhoneModel } from "../models/Iphone.js";
import { AirPodsModel } from "../models/AirPods.js";
import { AppleWatchModel } from "../models/AppleWatch.js";
import { MacbookModel } from "../models/Macbook.js";
import { IpadModel } from "../models/Ipad.js";
import { ConsoleModel } from "../models/Console.js";
import { UserModel } from "../models/User.js";
import { OrderModel } from "../models/Order.js";
import { ProductActivityModel } from "../models/ProductActivity.js";
import { SessionModel } from "../models/Session.js";

// This function creates an order and saves it to the database
export const createOrder = async (req, res) => {
  console.log(req.body);
  const user_order = req.body;
  const current_date = new Date();
  const day = ("0" + current_date.getDate()).slice(-2);
  const month = ("0" + (current_date.getMonth() + 1)).slice(-2);
  const year = current_date.getFullYear();

  try {
    const FindProductByName = async (name) => {
      let product =
        (await IPhoneModel.findOne({ model: name })) ||
        (await AirPodsModel.findOne({ model: name })) ||
        (await AppleWatchModel.findOne({ model: name })) ||
        (await MacbookModel.findOne({ model: name })) ||
        (await IpadModel.findOne({ model: name })) ||
        (await ConsoleModel.findOne({ model: name }));

      return product ? product._id : null;
    };

    const products_ordered_ids = [];

    for (const item of user_order.stored_array) {
      const product_id = await FindProductByName(item.model);

      if (product_id) products_ordered_ids.push(product_id);
    }

    const f_user_id = await UserModel.findOne({ email: user_order.user_email });

    const new_order = new OrderModel({
      _id: new mongoose.Types.ObjectId(),
      name: user_order.user_name,
      email: user_order.user_email,
      phone: user_order.user_phone,
      city: user_order.user_city,
      delivery_adress: user_order.user_del_address,
      payment_state: user_order.user_card ? "paid by card" : "сash on delivery",
      sum: user_order.user_sum,
      products_ordered: products_ordered_ids,
      user_id: f_user_id ? f_user_id._id : null,
      date_registration: `${day}.${month}.${year}`,
      status: "pending",
      viewed_admin: false,
    });

    new_order.save();

    for (const _id of products_ordered_ids) {
      if (_id !== null) {
        const p_id = await ProductActivityModel.findOne({ product_id: _id });

        if (p_id) {
          p_id.number_sales++;
          await p_id.save();
        }
      }
    }

    res.status(200).json({ message: "Order submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Order not submitted",
    });
  }
};

// This function retrieves the order history of a user
export const getOrderHistory = async (req, res) => {
  const user_t = req.token;

  try {
    const user = await SessionModel.findOne({ token: user_t });

    if (user) {
      const user_orders = await OrderModel.find({ user_id: user.user_id });
      const product_ids = user_orders
        .map((order) => order.products_ordered)
        .flat();

      const promises = product_ids.map(async (__id) => {
        const iphone_data = await IPhoneModel.findById(__id);
        const airpod_data = await AirPodsModel.findById(__id);
        const applewatch_data = await AppleWatchModel.findById(__id);
        const macbook_data = await MacbookModel.findById(__id);
        const ipad_data = await IpadModel.findById(__id);
        const console_data = await ConsoleModel.findById(__id);

        return [
          iphone_data,
          airpod_data,
          applewatch_data,
          macbook_data,
          ipad_data,
          console_data,
        ];
      });

      const data_product = await Promise.all(promises);
      const flattened_data_product = data_product
        .flat()
        .filter((product) => product !== null);

      const order_history = user_orders.map((order) => ({
        _id: order._id,
        products: flattened_data_product.filter((product) =>
          order.products_ordered.includes(product._id),
        ),
        date: order.date_registration,
        payment_method: order.payment_state,
        status: order.status,
      }));

      res.status(200).json({ order_history });
    } else res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order history not found" });
  }
};
