import path, { join } from "path";
import fs from "fs";

// Models
import { IPhoneModel } from "../models/Iphone.js";
import { AirPodsModel } from "../models/AirPods.js";
import { AppleWatchModel } from "../models/AppleWatch.js";
import { MacbookModel } from "../models/Macbook.js";
import { IpadModel } from "../models/Ipad.js";
import { ConsoleModel } from "../models/Console.js";
import { ProductActivityModel } from "../models/ProductActivity.js";

// Utils
import __dirname from "../utils/dirnameUtil.js";

const rootDir = path.resolve(__dirname, "../public");

// Search for products by query
export const searchForProducts = async (req, res) => {
  try 
  {
    const { query } = req.body;
    const iphones = await IPhoneModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");

    const formatted_data_iphones = iphones.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const airpods = await AirPodsModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");

    const formatted_data_airpods = airpods.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const applewatchs = await AppleWatchModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");
  
    const formatted_data_applewatchs = applewatchs.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const macbooks = await MacbookModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");
  
    const formatted_data_macbooks = macbooks.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const ipads = await IpadModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");
  
    const formatted_data_ipads = ipads.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const consoles = await ConsoleModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");
  
    const formatted_data_consoles = consoles.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const all_products = [...formatted_data_iphones , ...formatted_data_airpods, ...formatted_data_applewatchs, ...formatted_data_macbooks, ...formatted_data_ipads, ...formatted_data_consoles]; 

    res.status(200).json(all_products);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
};

// Get image by name
// export const getImage = (req, res) => {
  // const image_name = decodeURIComponent(req.params.ImageName);
  // const image_path = join(rootDir, "productImages", image_name);
  // console.log(image_path);

  // if (fs.existsSync(image_path)) {
  //   const image_stream = fs.createReadStream(image_path);

  //   image_stream.pipe(res);
  // } else res.status(404).send("Image not found");
// };

// Get all products
export const gettingDataForCarusel = async (req, res) => {
  try {
    const iphones = await IPhoneModel.find();

    const formatted_data_iphones = iphones
      .filter((i) => i.incarousel === true)
      .map((i) => {
        return {
          id: i.id,
          images: i.images[0],
          model: i.model,
          price: i.price,
          descont_price: i.descont_price,
        };
      });

    const airpods = await AirPodsModel.find();

    const formatted_data_airpods = airpods
      .filter((i) => i.incarousel === true)
      .map((i) => {
        return {
          id: i.id,
          images: i.images[0],
          model: i.model,
          price: i.price,
          descont_price: i.descont_price,
        };
      });

    const applewatchs = await AppleWatchModel.find();

    const formatted_data_applewatchs = applewatchs
      .filter((i) => i.incarousel === true)
      .map((i) => {
        return {
          id: i.id,
          images: i.images[0],
          model: i.model,
          price: i.price,
          descont_price: i.descont_price,
        };
      });

    const macbooks = await MacbookModel.find();

    const formatted_data_macbooks = macbooks
      .filter((i) => i.incarousel === true)
      .map((i) => {
        return {
          id: i.id,
          images: i.images[0],
          model: i.model,
          price: i.price,
          descont_price: i.descont_price,
        };
      });

    const ipads = await IpadModel.find();

    const formatted_data_ipads = ipads
      .filter((i) => i.incarousel === true)
      .map((i) => {
        return {
          id: i.id,
          images: i.images[0],
          model: i.model,
          price: i.price,
          descont_price: i.descont_price,
        };
      });

    const consoles = await ConsoleModel.find();

    const formatted_data_consoles = consoles
      .filter((i) => i.incarousel === true)
      .map((i) => {
        return {
          id: i.id,
          images: i.images[0],
          model: i.model,
          price: i.price,
          descont_price: i.descont_price,
        };
      });

    const formatted_data = [
      ...formatted_data_iphones,
      ...formatted_data_airpods,
      ...formatted_data_applewatchs,
      ...formatted_data_macbooks,
      ...formatted_data_ipads,
      ...formatted_data_consoles,
    ];

    res.status(200).json(formatted_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

// Get iphone data
export const getDataForListProductIphone = async (req, res) => {
  try {
    const iphones = await IPhoneModel.find();
    const formatted_data = iphones.map((phone) => {
      return {
        id: phone.id,
        images: phone.images[0],
        model: phone.model,
        memory: phone.memory,
        color: phone.color,
        price: phone.price,
        descont_price: phone.descont_price,
      };
    });

    res.status(200).json(formatted_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

// Get airpods data
export const getDataForListProductAirPods = async (req, res) => {
  try {
    const airpods = await AirPodsModel.find();

    const formatted_data = airpods.map((airpod) => {
      return {
        id: airpod.id,
        images: airpod.images[0],
        model: airpod.model,
        color: airpod.color,
        price: airpod.price,
        descont_price: airpod.descont_price,
      };
    });

    res.status(200).json(formatted_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

// Get applewatch data
export const getDataForListProductAppleWatch = async (req, res) => {
  try {
    const applewatchs = await AppleWatchModel.find();

    const formatted_data = applewatchs.map((applewatch) => {
      return {
        id: applewatch.id,
        images: applewatch.images[0],
        model: applewatch.model,
        color: applewatch.color[0],
        price: applewatch.price,
        descont_price: applewatch.descont_price,
      };
    });

    res.status(200).json(formatted_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

// Get macbook data
export const getDataForListProductMacbook = async (req, res) => {
  try {
    const macbooks = await MacbookModel.find();

    const formatted_data = macbooks.map((macbook) => {
      return {
        id: macbook.id,
        images: macbook.images[0],
        model: macbook.model,
        memory: macbook.memory,
        color: macbook.color,
        price: macbook.price,
        descont_price: macbook.descont_price,
      };
    });

    res.status(200).json(formatted_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

// Get ipad data
export const getDataForListProductIpad = async (req, res) => {
  try {
    const ipads = await IpadModel.find();

    const formatted_data = ipads.map((ipad) => {
      return {
        id: ipad.id,
        images: ipad.images[0],
        model: ipad.model,
        memory: ipad.memory[0],
        color: ipad.color[0],
        price: ipad.price,
        descont_price: ipad.descont_price,
      };
    });

    res.status(200).json(formatted_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

// Get console data
export const getDataForListProductConsole = async (req, res) => {
  try {
    const consoles = await ConsoleModel.find();

    const formatted_data = consoles.map((console) => {
      return {
        id: console.id,
        images: console.images[0],
        model: console.model,
        memory: console.memory,
        color: console.color[0],
        price: console.price,
        descont_price: console.descont_price,
      };
    });

    res.status(200).json(formatted_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

// Get data by id
export const extractDataByid = async (req, res) => {
  try {
    const _id = req.params.id;

    if (_id !== "null") {
      const p_id = await ProductActivityModel.findOne({ product_id: _id });

      if (p_id) {
        p_id.number_views++;
        await p_id.save();
      } else {
        const new_activity = new ProductActivityModel({
          product_id: _id,
          number_views: 1,
          number_sales: 0,
          number_favorites: 0,
        });

        await new_activity.save();
      }

      const iphone_data = await IPhoneModel.findById(_id);

      if (iphone_data) {
        res.status(200).json(iphone_data);
        return;
      }

      const airpod_data = await AirPodsModel.findById(_id);

      if (airpod_data) {
        res.status(200).json(airpod_data);
        return;
      }

      const applewatch_data = await AppleWatchModel.findById(_id);

      if (applewatch_data) {
        res.status(200).json(applewatch_data);
        return;
      }

      const macbook_data = await MacbookModel.findById(_id);

      if (macbook_data) {
        res.status(200).json(macbook_data);
        return;
      }

      const ipad_data = await IpadModel.findById(_id);

      if (ipad_data) {
        res.status(200).json(ipad_data);
        return;
      }

      const console_data = await ConsoleModel.findById(_id);

      if (console_data) {
        res.status(200).json(console_data);
        return;
      } else res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};
