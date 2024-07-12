// types/global.d.ts

import mongoose from "mongoose";

// declare global {
//   namespace NodeJS {
//     interface Global {
//       mongoose: {
//         conn: mongoose.Connection | null;
//         promise: Promise<mongoose.Connection> | null;
//       };
//     }
//   }
// }

// Add an index signature to globalThis to define mongoose
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: typeof import("mongoose");
    }
  }
}
