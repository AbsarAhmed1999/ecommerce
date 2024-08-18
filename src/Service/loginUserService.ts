import { JwtAuthService } from "@/app/utils/jwt-service";
import User from "@/model/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
interface login {
  email: string;
  password: string;
}

export async function loginUserService(userLoginCredentials: login) {
  const { email, password } = userLoginCredentials;
  // check if user exist ?
  const userExist = await User.findOne({ email });
  console.log("USER EXIST", userExist);
  if (userExist) {
    //Get User Hashed password from DB
    const hashPassword = userExist.password;
    // check password:
    const passwordMatched = await bcrypt.compare(password, hashPassword);
    if (!passwordMatched) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const jwtAuthService = new JwtAuthService();
    const token = jwtAuthService.createToken({
      id: userExist._id,
      email: userExist.email,
    });
    userExist.accessToken = token;
    await userExist.save();
    // const response = NextResponse.json({ userExist }, { status: 201 });
    const response = NextResponse.json(
      {
        user: {
          id: userExist._id,
          fullName: userExist.fullName,
          email: userExist.email,
          profileImage: userExist.profileImage,
        },
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
  } else {
    return NextResponse.json(
      { error: "Please Register First and than login" },
      { status: 404 }
    );
  }
}
