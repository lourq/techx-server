import { SessionModel } from "../models/Session.js";
import { UserModel } from "../models/User.js";

// Get user profile data
export const changeProfileData = async (req, res) => {
  try {
    const token = req.token;
    const session = await SessionModel.findOne({ token });

    if (!session) return res.status(404).json({ message: "Session not found" });

    const user = await UserModel.findById(session.user_id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.change_name) user.name = req.body.change_name;
    if (req.body.change_phone_number)
      user.phone_number = req.body.change_phone_number;
    if (req.body.change_delivery_address)
      user.delivery_address = req.body.change_delivery_address;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
