import mongoose from 'mongoose';

/*
  * Product activity models for working with MongoDB.
  * Defines the activity data structure using Data stored in the 'ProductActivity' collection.
*/

const ProductActivitySchema = new mongoose.Schema(
{
    product_id: mongoose.Schema.Types.ObjectId,
    number_views: Number,
    number_sales: Number,
    number_favorites: Number,
}, { collection: 'ProductActivity' })

const ProductActivityModel = mongoose.model('product_activity', ProductActivitySchema);

export {ProductActivityModel};