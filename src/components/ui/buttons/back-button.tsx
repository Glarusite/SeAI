import { safeBack } from "@src/common/router";
import React from "react";
import type { ButtonProps } from "react-native-paper";
import { Button } from "react-native-paper";

export type BackButtonProps = React.PropsWithChildren<Omit<ButtonProps, "children" | "onPress">> & object;

export default function BackButton({ children = "Back", mode = "outlined", ...props }: BackButtonProps) {
  return (
    <Button onPress={safeBack} mode={mode} {...props}>
      {children}
    </Button>
  );
}
