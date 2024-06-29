import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";
import { SessionModel } from "../models/Session.js";
import config from "../../configs/config_token.js";

const _token_secret_key = config.token_secret_key;

// Generate token for user
export const generateToken = async (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ user: email }, _token_secret_key, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Check token for user session
export const checkToken = async (req, res) => {
  try {
    const token = req.token;

    // Check token with secret key
    jwt.verify(token, _token_secret_key, (err, decoded) => {
      if (err) res.status(200).json({ success: false });
      else res.status(200).json({ success: true });
      console.error(err);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create session for user
export const createSession = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const new_session = new SessionModel({
      user_id: user.id,
      token: req.token,
    });

    await new_session.save();

    res.status(200).json({ create_session_data: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ create_session_data: false });
  }
};

// Pull out user data from session
export const pullOutOfSession = async (req, res) => {
  try {
    const token = req.token;
    const session = await SessionModel.findOne({ token });

    if (session) {
      const user = await UserModel.findOne({ _id: session.user_id });

      if (user) {
        const user_data = {
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          delivery_address: user.delivery_address,
          favourites: user.favourites,
        };

        res.status(200).json({ user_data });
      } else res.status(404).json({ message: "User not found" });
    } else res.status(404).json({ message: "Session not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

// Remove user session from database by token
export const removeFromSession = async (req, res) => {
  try {
    const token = req.token;
    const session = await SessionModel.findOne({ token });

    if (session) {
      await session.deleteOne();

      res.status(200).json({ message: "The session was over" });
    } else res.status(404).json({ message: "Session not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};
