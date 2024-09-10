import mongoose, { Model, Schema, model, models } from "mongoose";
import { IProduct } from "./Product";
import { UserType } from "@/app/enums/userType.enum";

interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string; // Password is now optional for Google users
  userType: UserType;
  cart: IProduct[];
  accessToken?: string;
  profileImage: string;
  googleId?: string; // Add googleId to store Google user's unique ID
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
  password: { type: String }, // Password is optional for Google OAuth users
  cart: { type: [CartProductSchema], default: [] },
  accessToken: { type: String, required: false },
  profileImage: { type: String, required: false, default: "" },
  googleId: { type: String, required: false, unique: true }, // Google ID for OAuth users
});

const User: Model<IUser> = models.User || model<IUser>("User", userSchema);
export default User;
