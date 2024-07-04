"use client";

import { useStore } from "@/components/store/useStore";
import { Button } from "@/components/ui/button";

export default function GetStartedNowBtn() {
  const { setShowWelcomeScreen } = useStore((state) => state);

  const handleGetStartedBtn = () => {
    setShowWelcomeScreen(false);
  };

  return <Button onClick={handleGetStartedBtn}>Get Started Now</Button>;
}
