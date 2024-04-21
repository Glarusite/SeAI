import { toLocaleDateString } from "@src/common/date";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GestureResponderEvent } from "react-native";
import { Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Checkbox, DataTable, useTheme } from "react-native-paper";

import LinkButton from "../ui/buttons/link-button";
import DataTableRow from "../ui/data-table-row";

import DocumentReminderStatus from "./document-reminder-status";
import DocumentThumbnail from "./document-thumbnail";
import type { DocumentsFilterProps } from "./documents-filter";
import DocumentsFilter from "./documents-filter";
import { useDocuments } from "./use-documents";
import { useDocumentsDownload } from "./use-documents-download";
import { useDocumentsShare } from "./use-documents-share";

export interface DocumentsDataTableProps extends DocumentsFilterProps {}

export default function DocumentsDataTable({ filter }: DocumentsDataTableProps) {
  const styles = useStyles();
  const { data, isLoading } = useDocuments({ filter });
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[1]);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const { isSharing, shareSelection } = useDocumentsShare(selection);
  const { isDownloading, downloadSelection } = useDocumentsDownload(selection);

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
      setSelection(new Set(selection));
    },
    [selection],
  );

  useEffect(() => setPage(0), [itemsPerPage]);
  useEffect(() => setSelection(new Set()), [data]);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <>
      {(isSharing || isDownloading) && (
        <View style={styles.overlay}>
          <ActivityIndicator size={100} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <LinkButton href="/scanner/" icon="camera" mode="contained-tonal">
          Scan Document
        </LinkButton>

        <LinkButton href="/documents/new" icon="plus" mode="contained">
          Add New Document
        </LinkButton>

        {Platform.OS === "web" ? (
          <Button icon="download" mode="contained" disabled={selection.size === 0} onPress={downloadSelection}>
            Download documents
          </Button>
        ) : (
          <Button icon="share" mode="contained" disabled={selection.size === 0} onPress={shareSelection}>
            Share documents
          </Button>
        )}
      </View>

      <DocumentsFilter filter={filter} />

      <DataTable>
        <DataTable.Header>
          <DataTable.Cell style={styles.checkboxCell}>
            {Platform.OS === "ios" ? (
              <View style={styles.checkboxContainer}>
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
              </View>
            ) : (
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
            )}
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
              {Platform.OS === "ios" ? (
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={id && selection?.has(id) ? "checked" : "unchecked"}
                    onPress={event => id && toggleSelection(event, id)}
                  />
                </View>
              ) : (
                <Checkbox
                  status={id && selection?.has(id) ? "checked" : "unchecked"}
                  onPress={event => id && toggleSelection(event, id)}
                />
              )}
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

function useStyles() {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: 0.5,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        },

        buttonContainer: {
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 16,
          width: "100%",
          justifyContent: "space-evenly",
        },

        checkboxContainer: {
          borderColor: colors.outline,
          backgroundColor: colors.background,
          borderWidth: 2,
          borderRadius: 24,
        },

        checkboxCell: { flex: 2.5, alignItems: "center" },

        cell: { flex: 5 },
      }),
    [colors],
  );
}

const numberOfItemsPerPageList = [10, 20, 50];
