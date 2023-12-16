import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Card, FAB, HelperText, List, Portal, Text } from "react-native-paper";

import { useVoyages } from "./use-voyages";

export function VoyagesList() {
  const { data, isLoading, error } = useVoyages();
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
        renderItem={({
          item: { id, vesselName, rank, imoNumber, joiningPort, joiningDate, leavingPort, leavingDate },
          index,
        }) => (
          <Card key={id} style={styles.card} onPress={() => router.push(`/voyages/${id}`)}>
            <List.Item
              title={`#${data.length - index}`}
              description={
                <View style={styles.gridContainer}>
                  <View>
                    <Text>Vessel Name:</Text>
                    <Text>Rank:</Text>
                    <Text>Vessel Type:</Text>
                    <Text>IMO Number:</Text>
                    <Text>Joining Port:</Text>
                    <Text>Joining Date:</Text>
                    <Text>Leaving Port:</Text>
                    <Text>Leaving Date:</Text>
                  </View>

                  <View>
                    <Text>{vesselName}</Text>
                    <Text>{rank}</Text>
                    <Text>N/A</Text>
                    <Text>{imoNumber}</Text>
                    <Text>{joiningPort}</Text>
                    <Text>{toLocaleDateString(joiningDate)}</Text>
                    <Text>{leavingPort}</Text>
                    <Text>{toLocaleDateString(leavingDate)}</Text>
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
            { icon: "camera", label: "Scan Voyage List", onPress: showFeatureInDevelopmentToast },
            { icon: "plus", label: "Add New Voyage", onPress: () => router.push("/voyages/new") },
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

  gridContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
