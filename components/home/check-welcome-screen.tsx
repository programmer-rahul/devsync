"use client";

import { useStore } from "@/components/store/useStore";
import { useEffect, useState } from "react";

export default function CheckWelcomeScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWelcome, setShowWelcome] = useState(false);

  const showWelcomeScreen = useStore((state) => state.showWelcomeScreen);

  useEffect(() => {
    const isVisible = localStorage.getItem("isWelcomeScreen");

    if (isVisible === null) {
      localStorage.setItem("isWelcomeScreen", "true");
      setShowWelcome(true);
    } else {
      setShowWelcome(isVisible === "true");
    }
  }, [showWelcomeScreen]);

  return <>{showWelcome ? children : <div>yes</div>}</>;
}
