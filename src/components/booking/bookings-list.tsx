import { toLocalDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { router } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Card, HelperText, List, Text } from "react-native-paper";

import TextValue from "../ui/text-value";

import { useBookings } from "./use-bookings";

export default function BookingsList() {
  const { data, isLoading, error } = useBookings();

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
        keyExtractor={({ id }) => id}
        removeClippedSubviews
        renderItem={({
          item: {
            id,
            trainingCenter,
            courseName,
            startDateTime,
            endDateTime,
            price,
            currency,
            bookedSlots,
            totalSlots,
          },
          index,
        }) => {
          const startDate = toLocalDate(startDateTime);
          const endDate = toLocalDate(endDateTime);
          const currencyFormat = new Intl.NumberFormat(undefined, { currency, style: "currency" });
          const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "numeric" });
          return (
            <Card key={id} style={styles.card} onPress={() => router.push(`/voyages/${id}`)}>
              <List.Item
                title={`#${index + 1}`}
                onPress={showFeatureInDevelopmentToast}
                description={
                  <View style={styles.gridContainer}>
                    <View>
                      <Text>Start date:</Text>
                      <Text>End date:</Text>
                      <Text>Training center:</Text>
                      <Text>Course name:</Text>
                      <Text>Time:</Text>
                      <Text>Price:</Text>
                      <Text>Slots availability:</Text>
                    </View>

                    <View style={styles.valueContainer}>
                      <TextValue>{startDate?.toLocaleDateString()}</TextValue>
                      <TextValue>{endDate?.toLocaleDateString()}</TextValue>
                      <TextValue>{trainingCenter}</TextValue>
                      <TextValue>{courseName}</TextValue>
                      <TextValue>
                        {timeFormat.format(startDate)} - {timeFormat.format(endDate)}
                      </TextValue>
                      <TextValue>{currencyFormat.format(price)}</TextValue>
                      <TextValue>
                        {bookedSlots} / {totalSlots}
                      </TextValue>
                    </View>
                  </View>
                }
              />
            </Card>
          );
        }}
      />
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
