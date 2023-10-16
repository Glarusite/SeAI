import { LinkProps, router } from "expo-router";
import React, { useCallback } from "react";
import { Button, ButtonProps } from "react-native-paper";

export type LinkButtonProps<T> = React.PropsWithChildren<Omit<ButtonProps, "onPress">> & {
  href: LinkProps<T>["href"];
};

export default function LinkButton<T>({ href, children, mode = "outlined", ...props }: LinkButtonProps<T>) {
  const handlePress = useCallback(() => {
    router.replace(href);
  }, [href]);

  return (
    <Button onPress={handlePress} mode={mode} {...props}>
      {children}
    </Button>
  );
}
