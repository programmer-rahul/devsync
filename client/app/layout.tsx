import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { Advent_Pro, Work_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Dev Sync",
  description: "Realtime coding and programming",
};

const primaryFont = Advent_Pro({
  weight: "variable",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-primary",
});

const secondaryFont = Work_Sans({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-secondary",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("dark", primaryFont.variable, secondaryFont.variable)}
      >
        {children}
        <ToastContainer transition={Bounce} hideProgressBar />
      </body>
    </html>
  );
}
