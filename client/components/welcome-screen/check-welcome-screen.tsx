"use client";

import { useStore } from "@/components/store/useStore";
import { useEffect, useState } from "react";

export default function CheckWelcomeScreen({
  WelcomeScreenComp,
  HomeScreenComp,
  HomePageLoadingComp,
}: {
  WelcomeScreenComp: React.ReactNode;
  HomeScreenComp: React.ReactNode;
  HomePageLoadingComp: React.ReactNode;
}) {
  // states
  const { showWelcomeScreen } = useStore((state) => state);
  const [loading, setloading] = useState(true);

  // Initializes component state and performs any setup actions after initial render.
  useEffect(() => {
    setloading(false);
  }, []);

  // Determines which component to render based on current state.
  const renderContent = () => {
    if (loading) {
      return HomePageLoadingComp;
    } else if (showWelcomeScreen) {
      return WelcomeScreenComp;
    } else {
      return HomeScreenComp;
    }
  };
  
  return <>{renderContent()}</>;
}
