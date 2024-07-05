import CheckWelcomeScreen from "@/components/welcome-screen/check-welcome-screen";
import HomeScreenLoading from "./components/home-screen/home-screen-loading";
import WelcomeScreen from "./components/welcome-screen/welcome-screen";
import HomeScreen from "./components/home-screen/home-screen";

export default function Home() {
  return (
    <CheckWelcomeScreen
      HomePageLoadingComp={<HomeScreenLoading />}
      WelcomeScreenComp={<WelcomeScreen />}
      HomeScreenComp={<HomeScreen />}
    />
  );
}
