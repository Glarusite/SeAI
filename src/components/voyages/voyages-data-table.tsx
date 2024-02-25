import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, DataTable, HelperText } from "react-native-paper";

import LinkButton from "../ui/buttons/link-button";
import DataTableRow from "../ui/data-table-row";

import { useVoyages } from "./use-voyages";

export default function VoyagesDataTable() {
  const { data, isLoading, error } = useVoyages();
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

  if (error) {
    return <HelperText type="error">{toErrorMessage(error)}</HelperText>;
  }

  return (
    <>
      <Button icon="camera" mode="contained" onPress={showFeatureInDevelopmentToast}>
        Scan Voyage List
      </Button>

      <LinkButton href="/voyages/new" icon="plus" mode="contained-tonal">
        Add New Voyage
      </LinkButton>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>#</DataTable.Title>
          <DataTable.Title>Vessel name</DataTable.Title>
          <DataTable.Title>Vessel type</DataTable.Title>
          <DataTable.Title>Rank</DataTable.Title>
          <DataTable.Title>IMO number</DataTable.Title>
          <DataTable.Title>Joining port</DataTable.Title>
          <DataTable.Title>Joining date</DataTable.Title>
          <DataTable.Title>Leaving port</DataTable.Title>
          <DataTable.Title>Leaving date</DataTable.Title>
        </DataTable.Header>

        {data
          ?.slice(from, to)
          .map(({ id, vesselName, rank, imoNumber, joiningPort, joiningDate, leavingPort, leavingDate }, index) => (
            <DataTableRow key={id} index={index} onPress={() => router.push(`/voyages/${id}`)}>
              <DataTable.Cell>{data.length - from - index}</DataTable.Cell>
              <DataTable.Cell>{vesselName}</DataTable.Cell>
              <DataTable.Cell>N/A</DataTable.Cell>
              <DataTable.Cell>{rank}</DataTable.Cell>
              <DataTable.Cell>{imoNumber}</DataTable.Cell>
              <DataTable.Cell>{joiningPort}</DataTable.Cell>
              <DataTable.Cell>{toLocaleDateString(joiningDate)}</DataTable.Cell>
              <DataTable.Cell>{leavingPort}</DataTable.Cell>
              <DataTable.Cell>{toLocaleDateString(leavingDate)}</DataTable.Cell>
            </DataTableRow>
          ))}

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
