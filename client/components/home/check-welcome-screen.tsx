"use client";

import { useStore } from "@/components/store/useStore";
import { useEffect, useState } from "react";

export default function CheckWelcomeScreen({
  children,
}: {
  children: React.ReactNode[];
}) {
  const showWelcomeScreen = useStore((state) => state.showWelcomeScreen);
  
  const [loading, setloading] = useState(true);

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const isVisible = localStorage.getItem("isWelcomeScreen");

    if (isVisible === null) {
      localStorage.setItem("isWelcomeScreen", "true");
      setShowWelcome(true);
      setloading(false);
    } else {
      setShowWelcome(isVisible === "true");
      setloading(false);
    }
  }, [showWelcomeScreen]);

  return (
    <>
      {loading ? (
        <section className="flex h-full items-center justify-center border text-4xl">
          <div className="loading-animation"></div>
        </section>
      ) : showWelcome ? (
        children[0]
      ) : (
        children[1]
      )}
    </>
  );
}
