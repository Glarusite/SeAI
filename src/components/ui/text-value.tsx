import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function TextValue({ children }: React.PropsWithChildren) {
  return (
    <Text style={style.text} numberOfLines={1}>
      {children || <>&nbsp;</>}
    </Text>
  );
}

const style = StyleSheet.create({
  text: {
    textOverflow: "ellipsis",
  },
});
