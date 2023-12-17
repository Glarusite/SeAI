import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { DataTable, useTheme } from "react-native-paper";

export interface DataTableRowProps extends React.ComponentProps<typeof DataTable.Row> {
  index: number;
}

export default function DataTableRow({ children, index, ...props }: DataTableRowProps) {
  const [hovered, setHovered] = useState(false);
  const styles = useStyles();

  return (
    <DataTable.Row
      {...props}
      style={index % 2 === 0 && !hovered ? styles.row : undefined}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      {children}
    </DataTable.Row>
  );
}

function useStyles() {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        row: {
          backgroundColor: colors.elevation.level1,
        },
      }),
    [colors],
  );
}
