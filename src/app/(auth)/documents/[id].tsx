import AppScrollView from "@src/components/app/app-scroll-view";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";

export default function DocumentPage() {
  const { id } = useLocalSearchParams();
  return (
    <AppScrollView>
      <Text>Document {id}</Text>
    </AppScrollView>
  );
}
