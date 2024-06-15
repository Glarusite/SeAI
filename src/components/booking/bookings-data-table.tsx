import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Button, DataTable, HelperText, Text } from "react-native-paper";

import DataTableRow from "../ui/data-table-row";

import { useBookings } from "./use-bookings";

import { toLocalDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { useAppSelector } from "@src/store";

export default function BookingsDataTable() {
  const { data, isLoading, error } = useBookings();
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[1]);
  const role = useAppSelector(state => state.user.role) || "SEAFARER";
  const isSeafarer = role === "SEAFARER";

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  if (error) {
    return <HelperText type="error">{toErrorMessage(error)}</HelperText>;
  }

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>#</DataTable.Title>
          <DataTable.Title style={styles.cell}>Start date</DataTable.Title>
          <DataTable.Title style={styles.cell}>End date</DataTable.Title>
          <DataTable.Title style={styles.wideCell}>Training center</DataTable.Title>
          <DataTable.Title style={styles.wideCell}>Course name</DataTable.Title>
          <DataTable.Title style={styles.wideCell}>Time</DataTable.Title>
          <DataTable.Title style={styles.cell}>Price</DataTable.Title>
          <DataTable.Title style={styles.cell}>Slots availability</DataTable.Title>
          <DataTable.Title style={styles.cell}>Actions</DataTable.Title>
        </DataTable.Header>

        {data
          ?.slice(from, to)
          .map(
            (
              { id, trainingCenter, courseName, startDateTime, endDateTime, price, currency, bookedSlots, totalSlots },
              index,
            ) => {
              const startDate = toLocalDate(startDateTime);
              const endDate = toLocalDate(endDateTime);
              const currencyFormat = new Intl.NumberFormat(undefined, { currency, style: "currency" });
              const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "numeric" });
              return (
                <DataTableRow key={id} index={index}>
                  <DataTable.Cell>{index + from + 1}</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>{startDate?.toLocaleDateString()}</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>{endDate?.toLocaleDateString()}</DataTable.Cell>
                  <DataTable.Cell style={styles.wideCell}>
                    <Text style={styles.text} numberOfLines={2} ellipsizeMode="middle">
                      {isSeafarer ? trainingCenter : "BMKC"}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.wideCell}>
                    <Text style={styles.text} numberOfLines={2} ellipsizeMode="middle">
                      {courseName}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.wideCell}>
                    {timeFormat.format(startDate)} - {timeFormat.format(endDate)}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>{currencyFormat.format(price)}</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {bookedSlots} / {totalSlots}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    <Button
                      mode="contained"
                      onPress={showFeatureInDevelopmentToast}
                      disabled={isSeafarer && totalSlots - bookedSlots <= 0}
                    >
                      {isSeafarer ? "Book" : "Info"}
                    </Button>
                  </DataTable.Cell>
                </DataTableRow>
              );
            },
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
  wideCell: {
    flex: 10,
    justifyContent: "center",
  },

  cell: {
    flex: 5,
    justifyContent: "center",
  },

  text: {
    textAlign: "center",
  },
});
