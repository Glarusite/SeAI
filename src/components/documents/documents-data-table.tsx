import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, DataTable, HelperText } from "react-native-paper";

import LinkButton from "../ui/buttons/link-button";
import DataTableRow from "../ui/data-table-row";

import DocumentThumbnail from "./document-thumbnail";
import { useDocuments } from "./use-documents";

export default function DocumentsDataTable() {
  const { data, isLoading, error } = useDocuments();
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
      <LinkButton href="/scanner/" icon="camera" mode="contained-tonal">
        Scan Document
      </LinkButton>

      <LinkButton href="/documents/new" icon="plus" mode="contained">
        Add New Document
      </LinkButton>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Preview</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Number</DataTable.Title>
          <DataTable.Title>Issue date</DataTable.Title>
          <DataTable.Title>Expiration date</DataTable.Title>
          <DataTable.Title>Upload date</DataTable.Title>
        </DataTable.Header>

        {data?.slice(from, to).map(({ id, name, number, issueDate, expiryDate, createdDate }, index) => (
          <DataTableRow key={id} index={index} onPress={() => router.push(`/documents/${id}`)}>
            <DataTable.Cell style={{ padding: 8 }}>
              <DocumentThumbnail documentId={id} size={60} />
            </DataTable.Cell>
            <DataTable.Cell>{name}</DataTable.Cell>
            <DataTable.Cell>{number}</DataTable.Cell>
            <DataTable.Cell>{toLocaleDateString(issueDate)}</DataTable.Cell>
            <DataTable.Cell>{toLocaleDateString(expiryDate)}</DataTable.Cell>
            <DataTable.Cell>{toLocaleDateString(createdDate)}</DataTable.Cell>
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
