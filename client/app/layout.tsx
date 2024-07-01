import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { Advent_Pro, Asap } from "next/font/google";

export const metadata: Metadata = {
  title: "Project",
  description: "Your Project",
};

const primaryFont = Advent_Pro({
  weight: ["100","200","300","400","500","600","700","800","900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-primary",
});

const secondaryFont = Asap({
  weight: ["100","200","300","400","500","600","700","800","900"],
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
        <main className="flex h-screen w-full flex-col">{children}</main>
        <ToastContainer transition={Bounce} hideProgressBar />
      </body>
    </html>
  );
}
