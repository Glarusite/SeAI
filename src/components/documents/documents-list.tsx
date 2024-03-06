import { useIsFocused } from "@react-navigation/native";
import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import type { GestureResponderEvent } from "react-native";
import { Platform, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Card, FAB, HelperText, List, Portal, Text, useTheme } from "react-native-paper";

import TextValue from "../ui/text-value";

import DocumentReminderStatus from "./document-reminder-status";
import DocumentThumbnail from "./document-thumbnail";
import type { DocumentsFilterProps } from "./documents-filter";
import DocumentsFilter from "./documents-filter";
import { useDocuments } from "./use-documents";

export interface DocumentsListProps extends DocumentsFilterProps {}

export default function DocumentsList({ filter }: DocumentsListProps) {
  const { data, isLoading, error } = useDocuments(filter);
  const [fabGroupState, setFabGroupState] = useState({ open: false });
  const [selection, setSelection] = useState<Set<string>>();
  const styles = useStyles();
  const isFocused = useIsFocused();

  const toggleSelection = useCallback(
    (event: GestureResponderEvent, id: string) => {
      event.stopPropagation();

      if (selection?.has(id)) {
        selection.delete(id);
      } else {
        selection?.add(id);
      }
      setSelection(new Set(selection));
    },
    [selection],
  );

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  if (error) {
    return <HelperText type="error">{toErrorMessage(error)}</HelperText>;
  }

  return (
    <>
      <DocumentsFilter style={styles.filterContainer} filter={filter} />

      <FlatList
        data={data}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={({ id }) => id!}
        removeClippedSubviews
        renderItem={({ item: { id, name, number, issueDate, expiryDate, createdDate } }) => (
          <Card
            key={id}
            style={[styles.card, id != null && selection?.has(id) && styles.selectedCard]}
            onPress={event => id && (selection == null ? router.push(`/documents/${id}`) : toggleSelection(event, id))}
            onLongPress={() => id && setSelection(new Set([id]))}
          >
            <List.Item
              title={
                <View style={styles.titleContainer}>
                  <Text>{name}</Text>
                  <DocumentReminderStatus expiryDate={expiryDate} />
                </View>
              }
              left={() => <DocumentThumbnail documentId={id} size={80} />}
              description={
                <View style={styles.gridContainer}>
                  <View>
                    <Text>Number:</Text>
                    <Text>Issue date:</Text>
                    <Text>Expiration date:</Text>
                    <Text>Upload date:</Text>
                  </View>

                  <View style={styles.valueContainer}>
                    <TextValue>{number}</TextValue>
                    <TextValue>{toLocaleDateString(issueDate)}</TextValue>
                    <TextValue>{toLocaleDateString(expiryDate)}</TextValue>
                    <TextValue>{toLocaleDateString(createdDate)}</TextValue>
                  </View>
                </View>
              }
            />
          </Card>
        )}
      />

      {isFocused && (
        <Portal>
          <FAB.Group
            visible
            icon={selection ? "select" : fabGroupState.open ? "close" : "plus"}
            open={fabGroupState.open}
            onStateChange={setFabGroupState}
            actions={
              fabGroupState.open
                ? [
                    { icon: "camera", label: "Scan Document", onPress: () => router.push("/scanner/") },
                    { icon: "plus", label: "Add New Document", onPress: () => router.push("/documents/new") },
                    ...(data.length > 0
                      ? selection == null
                        ? [{ icon: "select", label: "Select Documents", onPress: () => setSelection(new Set()) }]
                        : [
                            { icon: "select-off", label: "Cancel Selection", onPress: () => setSelection(undefined) },
                            { icon: "share", label: "Share Selection", onPress: showFeatureInDevelopmentToast },
                          ]
                      : []),
                  ]
                : []
            }
          />
        </Portal>
      )}
    </>
  );
}

function useStyles() {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 16,
          paddingTop: 0,
        },

        filterContainer: {
          paddingHorizontal: 16,
          paddingVertical: 16,
        },

        contentContainer: {
          gap: 16,
          paddingBottom: Platform.OS === "web" ? undefined : 64,
        },

        card: {
          height: "auto",
        },

        selectedCard: {
          color: colors.onTertiaryContainer,
          backgroundColor: colors.tertiaryContainer,
        },

        titleContainer: {
          flexDirection: "row",
          width: "100%",
          gap: 8,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        },

        gridContainer: {
          paddingTop: 8,
          flexDirection: "row",
          gap: 16,
        },

        valueContainer: {
          // TODO: Find out the reason for this hack
          flex: Platform.OS === "web" ? 1 : undefined,
        },
      }),
    [colors],
  );
}
