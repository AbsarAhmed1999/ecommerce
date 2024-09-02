import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { connectToMongoDB } from "@/database/connection";
import { Providers } from "./Providers";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // connectToMongoDB();
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
