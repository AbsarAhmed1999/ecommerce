// // Importing mongoose library along with Connection type from it
// import mongoose, { Connection } from "mongoose";

// // Declaring a variable to store the cached database connection
// let cachedConnection: Connection | null = null;

// // Function to establish a connection to MongoDB
// export async function connectToMongoDB() {
//   // If a cached connection exists, return it
//   if (cachedConnection) {
//     console.log("Using cached db connection");
//     return cachedConnection;
//   }
//   try {
//     // If no cached connection exists, establish a new connection to MongoDB
//     const cnx = await mongoose.connect(process.env.MONGODB_URI!);
//     // Cache the connection for future use
//     cachedConnection = cnx.connection;
//     // Log message indicating a new MongoDB connection is established
//     console.log("New mongodb connection established");
//     // Return the newly established connection
//     return cachedConnection;
//   } catch (error) {
//     // If an error occurs during connection, log the error and throw it
//     console.log(error);
//     throw error;
//   }
// }

import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  // Ensure MONGODB_URI is defined
  const mongoUri = process.env.MONGODB_URI;
  console.log("MONGODB_URI:", mongoUri);
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  // If a cached connection exists, use it
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }

  try {
    // Establish a new connection to MongoDB
    const cnx = await mongoose.connect(mongoUri);
    cachedConnection = cnx.connection;
    console.log("New mongodb connection established");
    return cachedConnection;
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
}
