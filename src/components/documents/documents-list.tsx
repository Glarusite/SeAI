import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { useAppSelector, useSaveDocument1Query } from "@src/store";
import { View } from "react-native";
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
      renderItem={({ item: { id, name, number, issueDate, expiryDate, createdDate } }) => (
        <Card key={id} style={{ height: "auto" }}>
          <List.Item
            title={name}
            left={() => <DocumentImage documentId={id} />}
            description={
              <View>
                <Text>Number: {number}</Text>
                <Text>Issue date: {toLocaleDateString(issueDate)}</Text>
                <Text>Expiration date: {toLocaleDateString(expiryDate)}</Text>
                <Text>Upload date: {toLocaleDateString(createdDate)}</Text>
              </View>
            }
          />
        </Card>
      )}
    />
  );
}

function useDocuments() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data, isLoading, error } = useSaveDocument1Query(userId, {
    skip: !userId,
  });

  return { data, isLoading, error };
}
