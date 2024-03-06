import { AsyncAlert } from "@src/common/async-alert";
import { toErrorMessage } from "@src/common/error";
import { useAppNavigation, useAsync } from "@src/common/hooks";
import { allowsNotificationsAsync, scheduleAllDocumentsNotificationsAsync } from "@src/common/notifications";
import { getNewDocumentReminders } from "@src/common/reminders";
import AppStack from "@src/components/app/app-stack";
import { useDocuments } from "@src/components/documents/use-documents";
import { useAppDispatch, useAppSelector } from "@src/store";
import { setNotificationHandler } from "expo-notifications";
import { Stack, router } from "expo-router";
import { useRef } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export default function SeafarerLayout() {
  const role = useAppSelector(state => state.user.role) || "SEAFARER";

  useAppNavigation(() => {
    if (role !== "SEAFARER") {
      router.push("/(auth)/(training)/");
    }
  }, [role]);

  useDocumentReminderNotifications();

  return (
    <AppStack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="booking/index" options={{ title: "Booking" }} />
      <Stack.Screen name="documents/[id]" options={{ title: "Document Review" }} />
      <Stack.Screen name="documents/index" options={{ title: "Documents" }} />
      <Stack.Screen name="documents/new" options={{ title: "Create document" }} />
      <Stack.Screen name="scanner/index" options={{ title: "Scanner" }} />
      <Stack.Screen name="scanner/camera" options={{ title: "Scan with camera" }} />
      <Stack.Screen name="user/index" options={{ title: "Profile" }} />
      <Stack.Screen name="voyages/[id]" options={{ title: "Voyage Review" }} />
      <Stack.Screen name="voyages/index" options={{ title: "Voyages" }} />
      <Stack.Screen name="voyages/new" options={{ title: "New Voyage" }} />
    </AppStack>
  );
}

// Show notifications when app is in foreground
setNotificationHandler({
  handleNotification: _ =>
    new Promise(resolve =>
      resolve({
        shouldPlaySound: true,
        shouldShowAlert: true,
        shouldSetBadge: false,
      }),
    ),
});

function useDocumentReminderNotifications() {
  const dispatch = useAppDispatch();
  const { data: documents } = useDocuments();
  const reminders = useAppSelector(state => state.reminders.documents);
  const remindersRef = useRef(reminders);

  useAsync(async () => {
    if (documents == null || documents.length === 0) {
      return;
    }

    if (await allowsNotificationsAsync()) {
      try {
        if (Platform.OS === "web") {
          const newReminders = getNewDocumentReminders(documents, remindersRef.current, dispatch);
          if (newReminders.length === 0) {
            return;
          }

          const redirectChoice = await AsyncAlert.confirm(
            "Expiring documents",
            "You have expiring one or more expiring documents. Would you like to go to the expiring documents page to review them?",
          );
          if (redirectChoice) {
            router.push("/documents/");
            router.setParams({ filter: "expiring" });
          }
        } else {
          await scheduleAllDocumentsNotificationsAsync(documents);
        }
      } catch (error) {
        console.error(error);
        Toast.show({
          type: "error",
          text1: "Notifications error",
          text2: `Couldn't initialize notifications due to error: ${toErrorMessage(error)}`,
        });
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Notifications disabled",
        text2: "Reminder notifications will only be shown when app is opened",
      });
    }
  }, [dispatch, documents]);
}