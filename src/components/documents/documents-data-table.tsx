import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import type { GestureResponderEvent } from "react-native";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Checkbox, DataTable, HelperText } from "react-native-paper";

import LinkButton from "../ui/buttons/link-button";
import DataTableRow from "../ui/data-table-row";

import DocumentReminderStatus from "./document-reminder-status";
import DocumentThumbnail from "./document-thumbnail";
import type { DocumentsFilterProps } from "./documents-filter";
import DocumentsFilter from "./documents-filter";
import { useDocuments } from "./use-documents";

export interface DocumentsDataTableProps extends DocumentsFilterProps {}

export default function DocumentsDataTable({ filter }: DocumentsDataTableProps) {
  const { data, isLoading, error } = useDocuments(filter);
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[1]);
  const [selection, setSelection] = useState<Set<string>>(new Set());

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  const toggleSelection = useCallback(
    (event: GestureResponderEvent, id: string) => {
      event.stopPropagation();

      if (selection.has(id)) {
        selection.delete(id);
      } else {
        selection.add(id);
      }
      console.log(selection);
      setSelection(new Set(selection));
    },
    [selection],
  );

  useEffect(() => setPage(0), [itemsPerPage]);
  useEffect(() => setSelection(new Set()), [data]);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  if (error) {
    return <HelperText type="error">{toErrorMessage(error)}</HelperText>;
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 16,
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <LinkButton href="/scanner/" icon="camera" mode="contained-tonal">
          Scan Document
        </LinkButton>

        <LinkButton href="/documents/new" icon="plus" mode="contained">
          Add New Document
        </LinkButton>

        <Button icon="share" mode="contained" disabled={selection.size === 0} onPress={showFeatureInDevelopmentToast}>
          Share documents
        </Button>
      </View>

      <DocumentsFilter filter={filter} />

      <DataTable>
        <DataTable.Header>
          <DataTable.Cell style={styles.checkboxCell}>
            <Checkbox
              status={
                selection.size > 0 && selection.size === data.length
                  ? "checked"
                  : selection.size > 0
                    ? "indeterminate"
                    : "unchecked"
              }
              onPress={() =>
                selection.size < data.length
                  ? setSelection(new Set(data.map(document => document.id).filter(Boolean) as string[]))
                  : setSelection(new Set())
              }
            />
          </DataTable.Cell>
          <DataTable.Title style={styles.cell}>Preview</DataTable.Title>
          <DataTable.Title style={styles.cell}>Name</DataTable.Title>
          <DataTable.Title style={styles.cell}>Number</DataTable.Title>
          <DataTable.Title style={styles.cell}>Issue date</DataTable.Title>
          <DataTable.Title style={styles.cell}>Expiration date</DataTable.Title>
          <DataTable.Title style={styles.cell}>Upload date</DataTable.Title>
          <DataTable.Title style={styles.cell}>Status</DataTable.Title>
        </DataTable.Header>

        {data?.slice(from, to).map(({ id, name, number, issueDate, expiryDate, createdDate }, index) => (
          <DataTableRow key={id} index={index} onPress={() => id && router.push(`/documents/${id}`)}>
            <DataTable.Cell style={styles.checkboxCell}>
              <Checkbox
                status={id && selection?.has(id) ? "checked" : "unchecked"}
                onPress={event => id && toggleSelection(event, id)}
              />
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <DocumentThumbnail documentId={id} size={64} />
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{name}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{number}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{toLocaleDateString(issueDate)}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{toLocaleDateString(expiryDate)}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{toLocaleDateString(createdDate)}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <DocumentReminderStatus expiryDate={expiryDate} />
            </DataTable.Cell>
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

const styles = StyleSheet.create({
  checkboxCell: { flex: 2, alignItems: "center" },
  cell: { flex: 5 },
});

const numberOfItemsPerPageList = [10, 20, 50];
