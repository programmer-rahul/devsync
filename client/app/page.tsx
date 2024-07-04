import CheckWelcomeScreen from "@/components/home/check-welcome-screen";
import HomeScreenLoading from "./components/home/home-screen-loading";
import WelcomeScreen from "./components/home/welcome-screen";
import HomeScreen from "./components/home/home-screen";

export default function Home() {
  return (
    <CheckWelcomeScreen
      HomePageLoadingComp={<HomeScreenLoading />}
      WelcomeScreenComp={<WelcomeScreen />}
      HomeScreenComp={<HomeScreen />}
    />
  );
}
