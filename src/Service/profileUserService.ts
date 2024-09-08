import { JwtAuthService } from "@/app/utils/jwt-service";
import User from "@/model/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
interface profileUserServiceProps {
  id: string;
  fullName: string;
  email: string;
  profileImage: string;
  password: string;
}

export async function profileUserService(
  updatedDetails: profileUserServiceProps
) {
  const { fullName, email, profileImage, password, id } = updatedDetails;
  console.log("ID here???", id);
  // hashPasswordFirst
  try {
    if (password === "") {
      console.log("PASSWORD IS EMPTY");
      const updateProfile = await User.findOneAndUpdate(
        { _id: id },
        {
          fullName: fullName,
          email: email,
          profileImage: profileImage,
        },
        { new: true, select: "-password" }
      );
      if (!updateProfile) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      // Customize the response to replace _id with id
      // const responseObject = {
      //   id: updateProfile._id, // Map _id to id
      //   fullName: updateProfile.fullName,
      //   email: updateProfile.email,
      //   profileImage: updateProfile.profileImage,
      //   userType: updateProfile.userType,
      // };

      // console.log("result", result);
      // return { user: updateProfile };
      return NextResponse.json({ user: updateProfile }, { status: 200 });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const updateProfile = await User.findOneAndUpdate(
        { _id: id },
        {
          fullName: fullName,
          email: email,
          profileImage: profileImage,
          password: hashPassword,
        }
      );
      console.log("updateProfile inside profileUserService", updateProfile);

      return NextResponse.json({ user: updateProfile }, { status: 200 });
    }
    // updateProfile
  } catch (e) {
    return NextResponse.json(
      { error: "An unkown error occured , Please Try again" },
      { status: 404 }
    );
  }
}
