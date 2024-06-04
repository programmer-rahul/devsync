import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Sync",
  description: "Realtime coding and programming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("dark")}>
        {children}
        <ToastContainer transition={Bounce} hideProgressBar />
      </body>
    </html>
  );
}
