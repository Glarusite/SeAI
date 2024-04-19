import type { ReminderPeriod } from "@src/models";
import type { GetDocumentResponse } from "@src/store";
import type { NotificationPermissionsStatus } from "expo-notifications";
import {
  IosAuthorizationStatus,
  cancelAllScheduledNotificationsAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
} from "expo-notifications";
import { Platform } from "react-native";

import { reminderPeriods } from "./configuration";
import { toReminderDate } from "./reminders";

export async function allowsNotificationsAsync() {
  if (Platform.OS === "web") {
    return true;
  }

  let status = await getPermissionsAsync();
  let allowsNotifications = status.granted || isIosStatusNotDenied(status);
  if (!status.granted && status.canAskAgain && isIosStatusNotDenied(status)) {
    status = await requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });

    allowsNotifications = status.granted || isIosStatusNotDenied(status);
  }

  return allowsNotifications;
}

function isIosStatusNotDenied(status: NotificationPermissionsStatus) {
  return status.ios?.status !== IosAuthorizationStatus.DENIED;
}

export async function scheduleAllDocumentsNotificationsAsync(documents: GetDocumentResponse[]) {
  // TODO: If we have other types of notifications we should only cancel the ones with the document identifiers
  await cancelAllScheduledNotificationsAsync();
  for (const document of documents) {
    for (const period of reminderPeriods) {
      await scheduleDocumentNotificationAsync(document, period);
    }
  }
}

async function scheduleDocumentNotificationAsync(document: GetDocumentResponse, period: ReminderPeriod) {
  const currentDate = new Date();
  const date = toReminderDate(document.expiryDate, period, { hours: 12 });
  if (date == null || date < currentDate) {
    return;
  }

  const identifier = `${document.id}-${period.value}-${period.type}`;

  await scheduleNotificationAsync({
    identifier,
    trigger: { date },
    content: {
      title: "Document expiration",
      body: `Document ${document.name} expires in ${period.value} ${period.type}${period.value === 1 ? "" : "s"}`,
    },
  });
}
