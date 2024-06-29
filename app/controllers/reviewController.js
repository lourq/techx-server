import { UserModel } from "../models/User.js";
import { ProductReviewModel } from "../models/ProductReview.js";

// Send product review to the database and save it
export const sendProductReview = async (req, res) => {
  try {
    const { product_id, review_owner_id, user_name, user_review, grade } =
      req.body;
    let found_user_id = null;
    let found_user_name = null;
    const current_date = new Date();
    const day = ("0" + current_date.getDate()).slice(-2);
    const month = ("0" + (current_date.getMonth() + 1)).slice(-2);
    const year = current_date.getFullYear();

    if (user_name == null) {
      const user_id = await UserModel.findOne({ email: review_owner_id });

      found_user_id = user_id.id;
      found_user_name = user_id.name;
    }

    const new_review = new ProductReviewModel({
      product_id,
      review_owner_id: found_user_id || review_owner_id,
      review_owner_name: user_name || found_user_name,
      review: user_review,
      grade,
      date: `${day}.${month}.${year}`,
      viewed_admin: false,
    });

    await new_review.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

// Get product review from the database
export const getProductReview = async (req, res) => {
  try {
    const prod_id = req.params.id;

    if (prod_id !== "null") {
      const review_data = await ProductReviewModel.find({
        product_id: prod_id,
      });

      if (review_data && review_data.length > 0)
        res.status(200).json(review_data);
    } else res.status(400).json({ message: "Invalid product ID" });
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};
