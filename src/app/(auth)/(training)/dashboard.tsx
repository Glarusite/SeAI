import dashboardImage1 from "@assets/tc-dashboard-1.png";
import dashboardImage2 from "@assets/tc-dashboard-2.png";
import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import { Image } from "expo-image";
import { View } from "react-native";
import { Title } from "react-native-paper";

export default function TrainingCenterDashboard() {
  const { width, height } = useAppDimensions();
  const wide = width >= 720;

  return (
    <AppScrollView wide={wide}>
      <Title style={{ alignSelf: "center" }}>Training Center Dashboard</Title>
      <View style={{ flexDirection: wide ? "row" : undefined, height: wide ? height - 200 : undefined }}>
        <Image
          source={dashboardImage1}
          style={{ width: wide ? "50%" : undefined, height: wide ? "100%" : height / 2 }}
          contentFit="contain"
        />
        <Image
          source={dashboardImage2}
          style={{ width: wide ? "50%" : undefined, height: wide ? "100%" : height / 2 }}
          contentFit="contain"
        />
      </View>
    </AppScrollView>
  );
}
