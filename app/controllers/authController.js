// Importing necessary libraries and tools
import bcrypt from "bcryptjs";
import {UserModel} from "../models/User.js";
import SEND_CODE_VERIFICATION from "../../configs/config_gmail.js";

// Check if user exists
export const checkUserExists = async (req, res) => {
  try {
    const { email } = req.body;
    const existing_user = await UserModel.findOne({ email });

    if (existing_user) res.status(200).json({ existing_user: true });
    else res.status(200).json({ existing_user: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Send confirmation code to email
export const sendConfirmationCodeEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const confirmation_сode = Math.floor(
      1000 + Math.random() * 9000,
    ).toString();

    SEND_CODE_VERIFICATION(email, confirmation_сode);

    res.status(200).json({ conf: confirmation_сode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add new user
export const newUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const new_user = new UserModel({
      name,
      email,
      password,
      phone_number: "null",
      delivery_address: "null",
      favourites: [],
    });

    await new_user.save();

    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Proof password
export const proofPass = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing_user = await UserModel.findOne({ email });

    if (existing_user) {
      const is_password_correct = await bcrypt.compare(
        password,
        existing_user.password,
      );

      if (is_password_correct) res.status(200).json({ success: true });
      else res.status(200).json({ success: false });
    } else res.status(200).json({ success: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
