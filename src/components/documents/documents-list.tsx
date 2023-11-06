import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { useAppSelector, useSaveDocument1Query } from "@src/store";
import { Platform, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Card, HelperText, List, Text } from "react-native-paper";

import DocumentImage from "./document-image";

export function DocumentsList() {
  const { data, isLoading, error } = useDocuments();

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  if (error) {
    return <HelperText type="error">{toErrorMessage(error)}</HelperText>;
  }

  return (
    <FlatList
      data={data}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={({ id }) => id!}
      removeClippedSubviews
      renderItem={({ item: { id, name, number, issueDate, expiryDate, createdDate } }) => (
        <Card key={id} style={styles.card}>
          <List.Item
            title={name}
            left={() => <DocumentImage documentId={id} />}
            description={
              <View style={styles.gridContainer}>
                <View>
                  <Text>Number: </Text>
                  <Text>Issue date: </Text>
                  <Text>Expiration date: </Text>
                  <Text>Upload date: </Text>
                </View>

                <View>
                  <Text>{number}</Text>
                  <Text>{toLocaleDateString(issueDate)}</Text>
                  <Text>{toLocaleDateString(expiryDate)}</Text>
                  <Text>{toLocaleDateString(createdDate)}</Text>
                </View>
              </View>
            }
          />
        </Card>
      )}
    />
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

  gridContainer: {
    flexDirection: "row",
  },
});

function useDocuments() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data, isLoading, error } = useSaveDocument1Query(userId, {
    skip: !userId,
  });

  return { data, isLoading, error };
}