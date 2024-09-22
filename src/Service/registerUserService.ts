import { JwtAuthService } from "@/app/utils/jwt-service";
import User from "@/model/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface UserInput {
  fullName: string;
  email: string;
  password: string;
}

export async function registerUserService(userInput: UserInput) {
  const { fullName, email, password } = userInput;

  // Perform any business logic validation here
  if (!fullName || !email || !password) {
    throw new Error("All fields are required");
  }

  // Check if user already exists by email
  const userExist = await User.findOne({ email: email });
  console.log("USER EXIST karta hai ++++", userExist);
  if (userExist) {
    return NextResponse.json(
      {
        title: "User already exists with this email",
        text: "Go to Sign In Page",
      },
      { status: 409 }
    );
  }
  console.log(
    "DURING registration I got fullName, email & password",
    fullName,
    email,
    password
  );
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  //instantiate jwt auth service
  const jwtAuthService = new JwtAuthService();
  console.log("Email does not exist now creating a new user");
  try {
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    console.log("newUser created");
    // generate token
    const token = jwtAuthService.createToken({
      id: newUser._id,
      email: newUser.email,
    });
    newUser.accessToken = token;
    await newUser.save();
    return NextResponse.json(
      {
        title: "Registration successfull",
        text: "Sign In",
        user: newUser,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    const e = error as Error;
    if ((e as any).code === 11000) {
      // Use 'any' to access 'code' property
      if ((e as any).keyPattern && (e as any).keyPattern.email) {
        throw new Error(`User already exists with this email: ${email}`);
      }
    }
    throw new Error("Failed to create new User");
  }
}
