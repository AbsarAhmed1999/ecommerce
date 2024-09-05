import mongoose, { Document, Schema } from "mongoose";

interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const OTPSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // expires after 10 minutes
});

// const OTP = mongoose.model<IOTP>("OTP", OTPSchema);
// Check if the model already exists to prevent OverwriteModelError
const OTP = mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);
export default OTP;
