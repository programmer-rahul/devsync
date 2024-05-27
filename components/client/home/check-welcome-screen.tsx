"use client";

import WelcomeScreen from "@/components/home/welcome-screen";
import { LocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CheckWelcomeScreen() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const isVisible = LocalStorage.get("isWelcomeScreen");

    isVisible === null && LocalStorage.set("isWelcomeScreen", true);
    isVisible ? setShowWelcome(true) : setShowWelcome(false);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen />;
  } else {
    return <div>yes</div>;
  }
}
