import { JwtAuthService } from "@/app/utils/jwt-service";
import User from "@/model/User";
import bcrypt from "bcrypt";
interface login {
  email: string;
  password: string;
}

export async function loginUserService(userLoginCredentials: login) {
  const { email, password } = userLoginCredentials;
  // check if user exist ?
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new Error("Please Register First & than Login");
  } else {
    //Get User Hashed password from DB
    const hashPassword = userExist.password;
    // check password:
    const passwordMatched = await bcrypt.compare(password, hashPassword);
    if (passwordMatched) {
      const jwtAuthService = new JwtAuthService();
      const token = jwtAuthService.createToken({
        id: userExist._id,
        email: userExist.email,
      });
      userExist.accessToken = token;
      await userExist.save();
      return { token, user: userExist };
    } else {
      throw new Error("Invalide Credentials ");
    }
  }
}
