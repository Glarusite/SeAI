import splashImageSource from "@assets/background.jpg";
import logoImageSource from "@assets/icon.png";
import { useAppNavigation } from "@src/common/hooks";
import LinkButton from "@src/components/ui/buttons/link-button";
import { useAppSelector } from "@src/store";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Platform, View } from "react-native";
import { Title } from "react-native-paper";

export default function MarketingPage() {
  const accessToken = useAppSelector(state => state.user.accessToken);

  useAppNavigation(() => {
    if (accessToken) {
      router.replace("/(auth)/");
    }
  }, [accessToken]);

  return (
    <>
      <Image source={splashImageSource} style={{ height: "100%", width: "100%" }} contentFit="cover" />
      <View
        style={{
          position: "absolute",
          top: 50,
          left: "5%",
          alignItems: "center",
          gap: Platform.OS === "web" ? undefined : 10,
        }}
      >
        <Image source={logoImageSource} style={{ height: 100, width: 100 }} />
        <Title style={{ fontSize: 40, fontWeight: "800", lineHeight: 40, color: "white" }}>SeAI</Title>
      </View>
      <View style={{ position: "absolute", top: 35, right: "5%", flexDirection: "row" }}>
        <LinkButton href="/about" mode="text">
          <Title style={{ fontSize: 20, fontWeight: "800", color: "white" }}>ABOUT</Title>
        </LinkButton>
        <LinkButton href="/user/login" mode="text">
          <Title style={{ fontSize: 20, fontWeight: "800", color: "white" }}>LOGIN</Title>
        </LinkButton>
      </View>
    </>
  );
}
