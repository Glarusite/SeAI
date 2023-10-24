import { useAppSelector } from "@src/store";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export default function NarrowView({ children }: React.PropsWithChildren) {
  const styles = useStyles();
  return <View style={styles.container}>{children}</View>;
}

function useStyles() {
  const fullscreen = useAppSelector(state => state.app.fullscreen);

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: 16,
          width: "100%",
          maxWidth: fullscreen ? undefined : 480,
        },
      }),
    [fullscreen],
  );
}
