import { A } from "@expo/html-elements";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Platform, View } from "react-native";
import { Icon, Text, Title, useTheme } from "react-native-paper";

import backgroundImageSource from "@assets/background.webp";
import logoDarkImageSource from "@assets/icon-dark.png";
import productPreviewImageSource from "@assets/product-preview.png";
import { useAppDimensions, useAppNavigation } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import LinkButton from "@src/components/ui/buttons/link-button";
import { useAppSelector } from "@src/store";

export default function MarketingPage() {
  const accessToken = useAppSelector(state => state.user.accessToken);
  const { width } = useAppDimensions();
  const isWide = width >= 960;
  const { colors } = useTheme();

  useAppNavigation(() => {
    if (accessToken) {
      router.push("/(auth)");
    } else if (Platform.OS === "android") {
      router.push("/user/login");
    }
  }, [accessToken]);

  if (accessToken) {
    return null;
  }

  return (
    <>
      <Image
        source={backgroundImageSource}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, height: "100%", zIndex: -1 }}
        contentFit="cover"
      />

      <AppScrollView wide>
        <View
          style={{
            position: "absolute",
            top: 50,
            left: "5%",
            alignItems: "center",
            gap: Platform.OS === "web" ? undefined : 10,
          }}
        >
          <Image source={logoDarkImageSource} style={{ height: 100, width: 100 }} />
          <Title style={{ fontSize: 40, fontWeight: "800", lineHeight: 40, color: "white" }}>SeAI</Title>
        </View>

        <View style={{ position: "absolute", top: 35, right: "5%", flexDirection: "row", zIndex: 100 }}>
          <LinkButton href="/about" mode="text">
            <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>ABOUT</Text>
          </LinkButton>
          <LinkButton href="/user/login" mode="text">
            <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>LOGIN</Text>
          </LinkButton>
        </View>

        <View style={{ flex: 1, gap: 16, position: "absolute", top: 240, left: "5%", right: "5%", paddingBottom: 16 }}>
          <View
            style={{
              flex: 1,
              gap: 16,
              marginRight: 16,
              flexDirection: isWide ? "row" : "column",
            }}
          >
            <View style={{ width: isWide ? "40%" : "100%" }}>
              <Title
                style={{
                  lineHeight: 48,
                  fontSize: 48,
                  fontWeight: "800",
                  color: "white",
                  textShadowColor: "black",
                  textShadowRadius: 5,
                  marginBottom: 50,
                }}
              >
                AI driven crew management
              </Title>
              <Text
                style={{
                  padding: 16,
                  fontSize: 16,
                  borderRadius: 16,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  textShadowColor: "black",
                  textShadowRadius: 2,
                }}
              >
                At SeAI, we leverage advanced AI and data analytics to transform maritime crew management. Our solutions
                ensure regulatory compliance, enhance operational efficiency, and streamline crew planning processes,
                setting new standards in the maritime industry.
              </Text>
            </View>
            <View style={{ width: isWide ? "60%" : "100%" }}>
              <Image
                source={productPreviewImageSource}
                style={{ height: "100%", minHeight: isWide ? 370 : 200 }}
                contentFit="contain"
              />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <Title style={{ textAlign: "center", fontSize: 24, fontWeight: "600", color: "white", marginBottom: 16 }}>
              Get in touch with us?
            </Title>
            <View style={{ flex: 1, gap: 16, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
              <Text style={{ fontSize: 20 }}>
                <A href="mailto:contact@seai.co" style={{ color: colors.primary, fontWeight: "600" }}>
                  <Icon source="email-outline" size={18} color="white" /> contact@seai.co
                </A>
              </Text>
              <Text style={{ fontSize: 20 }}>
                <A href="tel:+359888608980" style={{ color: colors.primary, fontWeight: "600" }}>
                  <Icon source="cellphone" size={18} color="white" /> +359 88 860 8980
                </A>
              </Text>
            </View>
          </View>
        </View>
      </AppScrollView>
    </>
  );
}
