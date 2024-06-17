import mongoose from 'mongoose';

/*
  * Product activity model for working with MongoDB.
  * Defines the activity data structure using Data stored in the 'ProductActivity' collection.
*/

const ProductActivitySchema = new mongoose.Schema(
{
    product_id: mongoose.Schema.Types.ObjectId,
    number_views: Number,
    number_sales: Number
}, { collection: 'ProductActivity' })

const ProductActivityModel = mongoose.model('product_activity', ProductActivitySchema);

export {ProductActivityModel};