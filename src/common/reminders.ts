import type { DateTime, IntRange, Nullable, ReminderPeriod } from "@src/models";
import type { GetDocumentResponse } from "@src/store";
import type { AppDispatch } from "@src/store/configure";
import type { DocumentReminder, RemindersState } from "@src/store/slices/reminders";
import { setDocumentReminder } from "@src/store/slices/reminders";

import { reminderPeriods } from "./configuration";
import { getDateInterval, toLocalDate } from "./date";

export function toReminderDate(
  date: Nullable<string> | DateTime,
  { value, type }: ReminderPeriod,
  time?: {
    hours: IntRange<0, 23>;
    minutes?: IntRange<0, 59>;
    seconds?: IntRange<0, 59>;
  },
) {
  const reminderDate = toLocalDate(date);
  if (reminderDate == null) {
    return;
  }

  switch (type) {
    case "year": {
      reminderDate.setFullYear(reminderDate.getFullYear() - value);
      break;
    }
    case "month": {
      reminderDate.setMonth(reminderDate.getMonth() - value);
      break;
    }
    case "day": {
      reminderDate.setDate(reminderDate.getDate() - value);
      break;
    }
  }

  if (time != null) {
    const { hours, minutes, seconds } = time;

    reminderDate.setHours(hours);

    if (minutes) {
      reminderDate.setMinutes(minutes);
    }

    if (seconds) {
      reminderDate.setSeconds(seconds);
    }
  }

  return reminderDate;
}

export function toReminderStatus(expiryDate: Nullable<string> | DateTime) {
  expiryDate = toLocalDate(expiryDate);
  if (expiryDate == null) {
    return "Unknown";
  }

  const { value, interval } = getDateInterval(expiryDate, new Date());

  return value > 0 ? `Expires in ${value} ${interval}${value === 1 ? "" : "s"}` : "Expired";
}

export function getNewDocumentReminders(
  documents: GetDocumentResponse[],
  reminders: RemindersState["documents"],
  dispatch: AppDispatch,
) {
  const result: DocumentReminder[] = [];
  const currentDate = new Date();
  for (const document of documents) {
    const { id, expiryDate } = document;
    const localExpiryDate = toLocalDate(expiryDate);
    if (id != null && localExpiryDate != null && localExpiryDate >= currentDate) {
      const period = reminderPeriods
        .map(reminderPeriod => ({ reminderPeriod, reminderDate: toReminderDate(expiryDate, reminderPeriod) }))
        .findLast(({ reminderDate }) => reminderDate && reminderDate <= currentDate)?.reminderPeriod;

      const { [id]: currentPeriod } = reminders;
      if (period != null && (currentPeriod == null || periodsAreNotEqual(period, currentPeriod))) {
        dispatch(setDocumentReminder({ id, period }));
        result.push({ id, period });
      }
    }
  }

  return result;
}

function periodsAreNotEqual(period1: ReminderPeriod, period2: ReminderPeriod) {
  return period1.value !== period2.value && period1.type !== period2.type;
}
