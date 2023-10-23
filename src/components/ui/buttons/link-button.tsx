import type { LinkProps } from "expo-router";
import { router } from "expo-router";
import React, { useCallback } from "react";
import type { ButtonProps } from "react-native-paper";
import { Button } from "react-native-paper";

export type LinkButtonProps<T> = Omit<ButtonProps, "onPress"> & {
  href: LinkProps<T>["href"];
};

export default function LinkButton<T>({ href, children, mode = "outlined", ...props }: LinkButtonProps<T>) {
  const handlePress = useCallback(() => {
    router.push(href);
  }, [href]);

  return (
    <Button onPress={handlePress} mode={mode} {...props}>
      {children}
    </Button>
  );
}
