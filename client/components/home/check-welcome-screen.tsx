"use client";

import { useStore } from "@/components/store/useStore";
import useSocket from "@/hooks/useSocket";
import { useEffect, useState } from "react";

export default function CheckWelcomeScreen({
  children,
}: {
  children: React.ReactNode[];
}) {
  const showWelcomeScreen = useStore((state) => state.showWelcomeScreen);

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const isVisible = localStorage.getItem("isWelcomeScreen");

    if (isVisible === null) {
      localStorage.setItem("isWelcomeScreen", "true");
      setShowWelcome(true);
    } else {
      setShowWelcome(isVisible === "true");
    }
  }, [showWelcomeScreen]);

  return <>{showWelcome ? children[0] : children[1]}</>;
}
