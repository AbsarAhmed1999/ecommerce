import { JwtAuthService } from "@/app/utils/jwt-service";
import User from "@/model/User";
import { NextResponse } from "next/server";

interface GoogleUserInput {
  fullName: string;
  email: string;
  googleId: string;
  profileImage?: string;
}

export async function registerUserServiceThroughGoogle(
  googleUserInput: GoogleUserInput
) {
  const { fullName, email, googleId, profileImage } = googleUserInput;

  if (!googleId || !email || !fullName) {
    throw new Error("Google user information is incomplete");
  }

  // Check if user already exists using googleId or email
  let user = await User.findOne({ googleId });
  console.log("Checking user through google ID user exist ?", user);

  // If user exists, return user and token
  if (!user) {
    console.log("now user does not exist through googleID");
    // If not found by googleId, check by email
    user = await User.findOne({ email });
    console.log("Does user exist with email ? ", user);

    if (user) {
      // If found by email but not by googleId, handle the case
      // For example, you might link Google account to existing user
      console.log(
        "Yes user exist with email saving googleId and profileImage through google"
      );
      user.googleId = googleId;
      user.profileImage = profileImage || user.profileImage;
      await user.save();
    }
  }

  // If user exists, return user and token
  if (user) {
    const jwtAuthService = new JwtAuthService();
    const token = jwtAuthService.createToken({
      id: user._id,
      email: user.email,
    });

    // Update accessToken
    user.accessToken = token;
    await user.save();
    const createNewObjectOfUser = {
      email: user.email,
      fullName: user.fullName,
      _id: user._id,
      profileImage: user.profileImage,
      userType: user.userType,
    };
    const response = NextResponse.json(
      {
        title: "Registration Successfull",
        user: createNewObjectOfUser,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60,
      path: "/",
    });
    return response;
  }

  // If user doesn't exist, create a new one
  try {
    const newUser = new User({
      fullName,
      email,
      googleId,
      profileImage,
    });

    console.log("new user creating ", newUser);

    const jwtAuthService = new JwtAuthService();
    const token = jwtAuthService.createToken({
      id: newUser._id,
      email: newUser.email,
    });

    newUser.accessToken = token;
    await newUser.save();

    const createNewObjectOfnewUser = {
      email: newUser.email,
      fullName: newUser.fullName,
      _id: newUser._id,
      profileImage: newUser.profileImage,
      userType: newUser.userType,
    };

    const response = NextResponse.json(
      {
        title: "Registration successful",
        user: createNewObjectOfnewUser,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60,
      path: "/",
    });
    return response;
  } catch (error) {
    throw new Error("Failed to register new Google User");
  }
}
