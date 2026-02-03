import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  location: string;
  cuisines: string[];
}

const RestaurantSchema: Schema<IRestaurant> = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    cuisines: { type: [String], required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
