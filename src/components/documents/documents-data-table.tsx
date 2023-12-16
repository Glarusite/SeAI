import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, DataTable, HelperText } from "react-native-paper";

import DocumentThumbnail from "./document-thumbnail";
import { useDocuments } from "./use-documents";

export default function DocumentsDataTable() {
  const { data, isLoading, error } = useDocuments();
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

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
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Preview</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Number</DataTable.Title>
        <DataTable.Title>Issue date</DataTable.Title>
        <DataTable.Title>Expiration date</DataTable.Title>
        <DataTable.Title>Upload date</DataTable.Title>
      </DataTable.Header>

      {data?.slice(from, to).map(({ id, name, number, issueDate, expiryDate, createdDate }) => (
        <DataTable.Row key={id} style={{ padding: 8 }} onPress={() => router.push(`/documents/${id}`)}>
          <DataTable.Cell>
            <DocumentThumbnail documentId={id} size={60} />
          </DataTable.Cell>
          <DataTable.Cell>{name}</DataTable.Cell>
          <DataTable.Cell>{number}</DataTable.Cell>
          <DataTable.Cell>{toLocaleDateString(issueDate)}</DataTable.Cell>
          <DataTable.Cell>{toLocaleDateString(expiryDate)}</DataTable.Cell>
          <DataTable.Cell>{toLocaleDateString(createdDate)}</DataTable.Cell>
        </DataTable.Row>
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
  );
}

const numberOfItemsPerPageList = [10, 20, 50];
