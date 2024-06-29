import { OrderModel } from '../../models/Order.js';
import { IPhoneModel } from '../../models/Iphone.js';
import { AirPodsModel } from '../../models/AirPods.js';
import { AppleWatchModel } from '../../models/AppleWatch.js';
import { MacbookModel } from '../../models/Macbook.js';
import { IpadModel } from '../../models/Ipad.js';
import { ConsoleModel } from '../../models/Console.js';

//
export const getOrder = async (req, res) => {
  try {
    const order_data = await OrderModel.find();
    const product_ids = order_data
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
    const formatted_data = order_data.map((order) => ({
      _id: order._id,
      name: order.name,
      email: order.email,
      phone: order.phone,
      city: order.city,
      delivery_adress: order.delivery_adress,
      sum: order.sum,
      products: flattened_data_product.filter((product) =>
        order.products_ordered.includes(product._id),
      ),
      date: order.date_registration,
      payment_method: order.payment_state,
      status: order.status,
      viewed_admin: order.viewed_admin,
    }));
    res.status(200).json({ formatted_data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

//
export const changeStatusOrder = async (req, res) => {
  const status_for = req.body;

  try {
    await OrderModel.findByIdAndUpdate(
      status_for._id,
      { status: status_for.status },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: `Status successfully changed to ${status_for.status}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Status change error` });
  }
}

//
export const markOrderVerification = async (req, res) => {
  const { _id } = req.body;

  try {
    await OrderModel.findByIdAndUpdate(
      _id,
      { viewed_admin: true },
      { new: true },
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Status change error" });
  }
}