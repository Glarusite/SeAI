import { getDateInterval, toLocalDate } from "@src/common/date";
import type { DateTime } from "@src/models";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

export interface DocumentReminderStatusProps {
  expiryDate: string | DateTime | undefined;
}

export default function DocumentReminderStatus({ expiryDate }: DocumentReminderStatusProps) {
  const styles = useStyles();
  expiryDate = toLocalDate(expiryDate);
  if (expiryDate == null) {
    return <Text>Unknown</Text>;
  }

  const { value, interval } = getDateInterval(expiryDate, new Date());
  function expiryValue<T>(valid: T, expires: T, expired: T) {
    return value > 1 && interval === "year" ? valid : value > 0 ? expires : expired;
  }

  return (
    <Text
      style={{
        ...styles.root,
        ...expiryValue(styles.valid, styles.expires, styles.expired),
      }}
    >
      {expiryValue("Valid for", "Expires in", "Expired")} {Math.abs(value)} {interval}
      {Math.abs(value) === 1 ? "" : "s"}
      {value < 0 ? " ago" : ""}
    </Text>
  );
}

function useStyles() {
  const { colors, dark } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        root: {
          borderRadius: 8,
          padding: 4,
        },

        valid: {
          backgroundColor: "#339900",
          color: colors.onPrimary,
        },

        expires: {
          backgroundColor: "#ff9966",
          color: colors.onPrimary,
        },

        expired: {
          backgroundColor: dark ? colors.errorContainer : colors.error,
          color: dark ? colors.onErrorContainer : colors.onError,
        },
      }),
    [colors, dark],
  );
}
