import { toLocaleDateString } from "@src/common/date";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { rankLabels, vesselTypeLabels } from "@src/models";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, DataTable, Text } from "react-native-paper";

import LinkButton from "../ui/buttons/link-button";
import DataTableRow from "../ui/data-table-row";

import { useVoyages } from "./use-voyages";

export default function VoyagesDataTable() {
  const { data, isLoading } = useVoyages();
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[1]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <>
      <View style={styles.buttonContainer}>
        {Platform.OS === "web" && (
          <Button icon="camera" mode="contained" onPress={showFeatureInDevelopmentToast}>
            Scan Voyage List
          </Button>
        )}

        <LinkButton href="/voyages/new" icon="plus" mode="contained-tonal">
          Add New Voyage
        </LinkButton>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.indexCell}>#</DataTable.Title>
          <DataTable.Title style={styles.valueCell}>Vessel name</DataTable.Title>
          <DataTable.Title style={styles.valueCell}>Vessel type</DataTable.Title>
          <DataTable.Title style={styles.valueCell}>Vessel flag</DataTable.Title>
          <DataTable.Title style={styles.valueCell}>IMO number</DataTable.Title>
          <DataTable.Title style={styles.valueCell}>Rank</DataTable.Title>
          <DataTable.Title style={styles.valueCell}>Joining port</DataTable.Title>
          <DataTable.Title style={styles.valueCell}>Joining date</DataTable.Title>
          <DataTable.Title style={styles.valueCell}>Leaving port</DataTable.Title>
          <DataTable.Title style={styles.valueCell}>Leaving date</DataTable.Title>
        </DataTable.Header>

        {data
          ?.slice(from, to)
          .map(
            (
              { id, vesselName, vesselType, flag, imoNumber, rank, joiningPort, joiningDate, leavingPort, leavingDate },
              index,
            ) => (
              <DataTableRow key={id} index={index} onPress={() => router.push(`/voyages/${id}`)}>
                <DataTable.Cell style={styles.indexCell}>{data.length - from - index}</DataTable.Cell>
                <DataTable.Cell style={styles.valueCell}>
                  <Text numberOfLines={2}>{vesselName}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.valueCell}>
                  <Text numberOfLines={2}>{vesselType && vesselTypeLabels[vesselType]}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.valueCell}>{flag || "N/A"}</DataTable.Cell>
                <DataTable.Cell style={styles.valueCell}>{imoNumber}</DataTable.Cell>
                <DataTable.Cell style={styles.valueCell}>
                  <Text numberOfLines={2}>{rank && rankLabels[rank]}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.valueCell}>{joiningPort}</DataTable.Cell>
                <DataTable.Cell style={styles.valueCell}>{toLocaleDateString(joiningDate)}</DataTable.Cell>
                <DataTable.Cell style={styles.valueCell}>{leavingPort}</DataTable.Cell>
                <DataTable.Cell style={styles.valueCell}>{toLocaleDateString(leavingDate)}</DataTable.Cell>
              </DataTableRow>
            ),
          )}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={setPage}
          label={`${from + 1}-${to} of ${data.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel="Rows per page"
        />
      </DataTable>
    </>
  );
}

const numberOfItemsPerPageList = [10, 20, 50];

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    width: "100%",
    justifyContent: "space-evenly",
  },

  indexCell: {
    flex: 1,
  },

  valueCell: {
    flex: 5,
  },
});
