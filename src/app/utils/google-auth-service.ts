// utils/google-oauth-service.ts
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Your Google Client ID
const client = new OAuth2Client(CLIENT_ID);

export async function verifyGoogleToken(token: string) {
  try {
    // Verify the token using Google's OAuth2Client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    // Get the payload containing the user information
    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Invalid Google token");
    }

    return {
      id: payload.sub, // The user's unique Google ID
      email: payload.email, // The user's email
      name: payload.name, // The user's name
      picture: payload.picture, // The user's Google profile picture
    };
  } catch (error) {
    console.error("Error verifying Google token", error);
    throw new Error("Google token verification failed");
  }
}
