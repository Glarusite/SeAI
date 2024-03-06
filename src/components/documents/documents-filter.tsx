import { router } from "expo-router";
import type { ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

export interface DocumentsFilterProps {
  style?: ViewStyle;
  filter: string | string[];
}

export default function DocumentsFilter({ style, filter }: DocumentsFilterProps) {
  return (
    <View style={[styles.container, style]}>
      <Chip mode={!filter || filter === "all" ? "flat" : "outlined"} onPress={clearParameters}>
        All
      </Chip>
      <Chip mode={filter === "expiring" ? "flat" : "outlined"} onPress={setExpiringParameters}>
        Expiring
      </Chip>
      <Chip mode={filter === "expired" ? "flat" : "outlined"} onPress={setExpiredParameters}>
        Expired
      </Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

function clearParameters() {
  router.setParams({ filter: "all" });
}

function setExpiringParameters() {
  router.setParams({ filter: "expiring" });
}

function setExpiredParameters() {
  router.setParams({ filter: "expired" });
}
