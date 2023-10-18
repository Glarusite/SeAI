import { StyleSheet } from "react-native";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native-paper";

export default function ButtonActivityIndicator(props: ActivityIndicatorProps) {
  return <ActivityIndicator style={styles.spinner} size={16} {...props} />;
}

const styles = StyleSheet.create({
  spinner: {
    marginHorizontal: 8,
    top: 2,
  },
});