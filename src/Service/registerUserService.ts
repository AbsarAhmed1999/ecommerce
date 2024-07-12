import User from "@/model/User";
import bcrypt from "bcrypt";
interface UserInput {
  fullName: string;
  email: string;
  password: string;
}

export async function registerUserService(userInput: UserInput) {
  const { fullName, email, password } = userInput;
  console.log(userInput);
  console.log("INSIDE USER SERVICE");
  // Perform any business logic validation here
  if (!fullName || !email || !password) {
    throw new Error("All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email });
  console.log("CHecking Existing User", existingUser);
  if (existingUser) {
    throw new Error("User already exists");
  }

  //Hash Password
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log("THIS IS HASHED PASSWORD", hashedPassword);
  // Create a new user
  try {
    console.log("INSDIE TRY AND CATCH");
    const newUser = new User({ email, fullName, password: hashedPassword });
    console.log(newUser);
    await newUser.save();

    return newUser;
  } catch (e) {
    throw new Error("Failed to create new User");
  }
}
