import { toLocaleDateString } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Card, FAB, HelperText, List, Portal, Text } from "react-native-paper";

import TextValue from "../ui/text-value";

import { useVoyages } from "./use-voyages";

export default function VoyagesList() {
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
                    <Text>Vessel name:</Text>
                    <Text>Rank:</Text>
                    <Text>Vessel type:</Text>
                    <Text>IMO number:</Text>
                    <Text>Joining port:</Text>
                    <Text>Joining date:</Text>
                    <Text>Leaving port:</Text>
                    <Text>Leaving date:</Text>
                  </View>

                  <View style={styles.valueContainer}>
                    <TextValue>{vesselName}</TextValue>
                    <TextValue>{rank}</TextValue>
                    <TextValue>N/A</TextValue>
                    <TextValue>{imoNumber}</TextValue>
                    <TextValue>{joiningPort}</TextValue>
                    <TextValue>{toLocaleDateString(joiningDate)}</TextValue>
                    <TextValue>{leavingPort}</TextValue>
                    <TextValue>{toLocaleDateString(leavingDate)}</TextValue>
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
    width: "100%",
    gap: 16,
  },

  valueContainer: {
    flex: 1,
  },
});
