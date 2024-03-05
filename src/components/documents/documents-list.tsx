import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Card, FAB, HelperText, List, Portal, Text } from "react-native-paper";

import TextValue from "../ui/text-value";

import DocumentReminderStatus from "./document-reminder-status";
import DocumentThumbnail from "./document-thumbnail";
import { useDocuments } from "./use-documents";

export default function DocumentsList() {
  const { data, isLoading, error } = useDocuments();
  const [fabGroupState, setFabGroupState] = useState({ open: false });

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  if (error) {
    return <HelperText type="error">{toErrorMessage(error)}</HelperText>;
  }

  return (
    <>
      <FlatList
        data={data}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={({ id }) => id!}
        removeClippedSubviews
        renderItem={({ item: { id, name, number, issueDate, expiryDate, createdDate } }) => (
          <Card key={id} style={styles.card} onPress={() => router.push(`/documents/${id}`)}>
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

      <Portal>
        <FAB.Group
          visible
          icon={fabGroupState.open ? "close" : "plus"}
          open={fabGroupState.open}
          onStateChange={setFabGroupState}
          actions={[
            { icon: "camera", label: "Scan Document", onPress: () => router.push("/scanner/") },
            { icon: "plus", label: "Add New Document", onPress: () => router.push("/documents/new") },
          ]}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  contentContainer: {
    gap: 16,
    paddingBottom: Platform.OS === "web" ? undefined : 64,
  },

  card: {
    height: "auto",
  },

  titleContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 8,
  },

  gridContainer: {
    flexDirection: "row",
    gap: 16,
  },

  valueContainer: {
    flex: 1,
  },
});
