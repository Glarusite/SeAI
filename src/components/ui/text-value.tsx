import { Text } from "react-native-paper";

export default function TextValue({ children }: React.PropsWithChildren) {
  return <Text numberOfLines={1}>{children || <>&nbsp;</>}</Text>;
}
