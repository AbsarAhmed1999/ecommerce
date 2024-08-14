import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;
export class JwtAuthService {
  public constructor() {}
  createToken(payload: object): string {
    // console.log("SECRET USED FOR SIGNING", secret);
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }

  verifyToken(token: string): object | null {
    try {
      // console.log("SECRET USED FOR VERIFICATION", secret);
      return jwt.verify(token, secret) as object;
    } catch (error) {
      return null;
    }
  }
}
