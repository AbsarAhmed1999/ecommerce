import mongoose, { Model, Schema, model, models } from "mongoose";
import { IProduct } from "./Product";
import { UserType } from "@/app/enums/userType.enum";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  userType: UserType;
  cart: IProduct[];
  accessToken: string;
  profileImage: string;
}

interface ICartProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}
const CartProductSchema = new Schema<ICartProduct>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
});

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: {
    type: String,
    enum: Object.values(UserType),
    default: UserType.USER,
  },
  password: { type: String, required: true },
  cart: { type: [CartProductSchema], default: [] },
  accessToken: { type: String, required: false },
  profileImage: { type: String, required: false },
});

const User: Model<IUser> = models.User || model<IUser>("User", userSchema);
export default User;
