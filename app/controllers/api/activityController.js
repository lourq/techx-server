import { IPhoneModel } from '../../models/Iphone.js';
import { AirPodsModel } from '../../models/AirPods.js';
import { AppleWatchModel } from '../../models/AppleWatch.js';
import { MacbookModel } from '../../models/Macbook.js';
import { IpadModel } from '../../models/Ipad.js';
import { ConsoleModel } from '../../models/Console.js';
import { ProductActivityModel } from '../../models/ProductActivity.js';
import { ProductReviewModel } from '../../models/ProductReview.js';

//
export const getProductStatistics = async (req, res) => {
  try {
    const prod_activities = await ProductActivityModel.find({});
    const models_data = await Promise.all(
      prod_activities.map(async (activity) => {
        try {
          let model = null;
          let number_views = 0;
          let number_sales = 0;
          let number_favorites = 0;

          if (await IPhoneModel.exists({ _id: activity.product_id }))
            model = await IPhoneModel.findById(activity.product_id)
              .select("model")
              .lean();
          else if (await AirPodsModel.exists({ _id: activity.product_id }))
            model = await AirPodsModel.findById(activity.product_id)
              .select("model")
              .lean();
          else if (await AppleWatchModel.exists({ _id: activity.product_id }))
            model = await AppleWatchModel.findById(activity.product_id)
              .select("model")
              .lean();
          else if (await MacbookModel.exists({ _id: activity.product_id }))
            model = await MacbookModel.findById(activity.product_id)
              .select("model")
              .lean();
          else if (await IpadModel.exists({ _id: activity.product_id }))
            model = await IpadModel.findById(activity.product_id)
              .select("model")
              .lean();
          else if (await ConsoleModel.exists({ _id: activity.product_id }))
            model = await ConsoleModel.findById(activity.product_id)
              .select("model")
              .lean();

          number_views = activity.number_views;
          number_sales = activity.number_sales;
          number_favorites = activity.number_favorites;

          if (model) {
            const product_stats = {
              model: model.model,
              number_views,
              number_sales,
              number_favorites,
            };

            return product_stats;
          } else return null;
        } catch (error) {
          console.error("Error fetching models data:", error);
          return null;
        }
      }),
    );

    const filtered_models_data = models_data.filter((model) => model !== null);

    res.status(200).json(filtered_models_data);
  } catch (error) {
    console.error("Error fetching product statistics:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching product statistics" });
  }
}

// 
export const getProductReview = async (req, res) => {
  try {
    const review_data = await ProductReviewModel.find();
    const formatted_data = [];

    if (review_data && review_data.length > 0) {
      const reviews_product = [];
      const review_owner = [];

      for (const review of review_data) {
        const iphone_data = await IPhoneModel.findById(review.product_id, {
          model: 1,
          images: { $slice: 1 },
        });

        review_owner.push(review.review_owner_name);

        if (iphone_data) {
          reviews_product.push(iphone_data);
          continue;
        }

        const airpod_data = await AirPodsModel.findById(review.product_id, {
          model: 1,
          images: { $slice: 1 },
        });

        if (airpod_data) {
          reviews_product.push(airpod_data);
          continue;
        }

        const applewatch_data = await AppleWatchModel.findById(
          review.product_id,
          { model: 1, images: { $slice: 1 } },
        );

        if (applewatch_data) {
          reviews_product.push(applewatch_data);
          continue;
        }

        const macbook_data = await MacbookModel.findById(review.product_id, {
          model: 1,
          images: { $slice: 1 },
        });

        if (macbook_data) {
          reviews_product.push(macbook_data);
          continue;
        }

        const ipad_data = await IpadModel.findById(review.product_id, {
          model: 1,
          images: { $slice: 1 },
        });

        if (ipad_data) {
          reviews_product.push(ipad_data);
          continue;
        }

        const console_data = await ConsoleModel.findById(review.product_id, {
          model: 1,
          images: { $slice: 1 },
        });

        if (console_data) {
          reviews_product.push(console_data);
          continue;
        }
      }

      for (let i = 0; i < review_data.length; i++) {
        const combined = {
          id: review_data[i].id,
          review: review_data[i].review,
          grade: review_data[i].grade,
          product_arr: reviews_product[i],
          owner_name: review_owner[i],
          date: review_data[i].date,
          viewed_admin: review_data[i].viewed_admin,
        };

        formatted_data.push(combined);
      }

      res.status(200).json(formatted_data);
    } else res.status(200).json([]);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
}

//
export const removingReviewById = async (req, res) => {
    try {
        const review_id = req.body.id;

        const id_r = await ProductReviewModel.findByIdAndDelete(review_id);

        if (id_r) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false, error: "Review not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
}

//
export const adminChecked = async (req, res) => {
    try {
        const review_id = req.body.id;

        const id_r = await ProductReviewModel.findById(review_id);

        if (id_r != null) {
            id_r.viewed_admin = true;

            await id_r.save();

            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
}