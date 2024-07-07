import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import localFont from "next/font/local";
import Favicons from "./components/layouts/Favicons";

export const metadata: Metadata = {
  title: "Dev Sync",
  description: "Realtime coding and programming",
};

const primaryFont = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  variable: "--font-primary",
  display: "swap",
});

const secondaryFont = localFont({
  src: "./fonts/Exo2.ttf",
  variable: "--font-secondary",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Favicons />
      </head>

      <body
        className={cn("dark", primaryFont.variable, secondaryFont.variable)}
      >
        <main className="flex h-screen w-full flex-col">{children}</main>
        <ToastContainer transition={Bounce} hideProgressBar />
      </body>
    </html>
  );
}
