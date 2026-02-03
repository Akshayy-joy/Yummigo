import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  restaurantId: string;
  items: { name: string; qty: number; price: number }[];
  totalAmount: number;
  status: string;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [
      {
        name: String,
        qty: Number,
        price: Number
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
