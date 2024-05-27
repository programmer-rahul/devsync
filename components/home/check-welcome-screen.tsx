"use client";

import { useEffect, useState } from "react";

export default function CheckWelcomeScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const isVisible = localStorage.getItem("isWelcomeScreen");

    if (isVisible === null) {
      localStorage.setItem("isWelcomeScreen", "true");
      setShowWelcome(true);
    } else {
      setShowWelcome(isVisible === "true");
    }
  }, []);

  return <>{showWelcome ? children : <div>yes</div>}</>;
}
