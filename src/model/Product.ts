import mongoose, { Schema, model, models } from "mongoose";
export interface IProduct {
  name: string;
  price: number;
  description: string;
  // category: string;
  image: string;
}
const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  // category: { type: String, required: true },
  image: { type: String, required: true },
});

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
