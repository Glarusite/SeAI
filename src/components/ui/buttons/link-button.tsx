import { router } from "expo-router";
import React, { useCallback } from "react";
import type { ButtonProps } from "react-native-paper";
import { Button } from "react-native-paper";

export type LinkButtonProps = Omit<ButtonProps, "onPress"> & {
  href: Parameters<(typeof router)["push"]>[0];
};

export default function LinkButton({ href, children, mode = "outlined", ...props }: LinkButtonProps) {
  const handlePress = useCallback(() => {
    router.push(href);
  }, [href]);

  return (
    <Button onPress={handlePress} mode={mode} {...props}>
      {children}
    </Button>
  );
}
