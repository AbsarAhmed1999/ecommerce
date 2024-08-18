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

  if (userExist) {
    return NextResponse.json(
      { error: "User already exists with this email" },
      { status: 409 }
    );
  }

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  //instantiate jwt auth service
  const jwtAuthService = new JwtAuthService();
  // Create a new user
  try {
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    // generate token
    const token = jwtAuthService.createToken({
      id: newUser._id,
      email: newUser.email,
    });
    newUser.accessToken = token;
    await newUser.save();
    return { user: newUser, token };
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
