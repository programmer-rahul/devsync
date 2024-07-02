import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { Space_Grotesk, Exo } from "next/font/google";

export const metadata: Metadata = {
  title: "Dev Sync",
  description: "Realtime coding and programming",
};

const primaryFont = Space_Grotesk({
  weight: "variable",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-primary",
});

const secondaryFont = Exo({
  weight: "variable",
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
