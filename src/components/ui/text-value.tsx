import { Text } from "react-native-paper";

export interface ValueProps {
  children: string | undefined;
}

export default function TextValue({ children }: ValueProps) {
  return <Text>{children || <>&nbsp;</>}</Text>;
}
