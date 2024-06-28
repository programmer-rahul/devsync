import WelcomeScreen from "./components/home/welcome-screen";
import CheckWelcomeScreen from "@/components/home/check-welcome-screen";
import HomeScreen from "./components/home/home-screen";

export default function Home() {
  return (
      <CheckWelcomeScreen>
        <WelcomeScreen />
        <HomeScreen />
      </CheckWelcomeScreen>
  );
}
