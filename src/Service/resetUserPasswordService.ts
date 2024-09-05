import { JwtAuthService } from "@/app/utils/jwt-service";
import User from "@/model/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function resetUserPasswordService({ email, newPassword }: any) {
  console.log(email, newPassword);
  // check if user exist ?
  const hashPassword = await bcrypt.hash(newPassword, 10);
  const fineEmailAndUpdatePassword = await User.findOneAndUpdate(
    { email: email },
    { password: hashPassword }
  );
  console.log("fineEmailAndUpdatePassword", fineEmailAndUpdatePassword);

  return NextResponse.json(
    {
      success: true,
      message: "Password has been Updated Successfully",
    },
    { status: 200 }
  );
}
