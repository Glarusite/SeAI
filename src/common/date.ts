import type { DateTime, LocalDateTime, Nullable, UtcDateTime } from "@src/models";
import { getLocales } from "expo-localization";

import { isInvalidDate } from "./validators";

export function toDate(value: Nullable<string>) {
  if (value != null) {
    const date = new Date(value);
    if (isInvalidDate(date)) {
      return;
    }

    return date;
  }
}

export function toLocaleDateString(date: Nullable<string> | DateTime) {
  if (typeof date === "string") {
    date = toDate(date);
  }

  return date?.toLocaleDateString(locales);
}

const locales = getLocales().map(locale => locale.languageTag);

export function toLocalDate(date: Nullable<string> | DateTime) {
  if (typeof date === "string") {
    date = toDate(date);
  }

  if (date == null) {
    return;
  }

  if (date.kind === "local") {
    date = new Date(date);
  } else {
    const localDateValue = date.getTime() + date.getTimezoneOffset() * 60_000;
    date = new Date(localDateValue);
  }

  date.kind = "local";

  return date as LocalDateTime;
}

export function toUtcDate(date: Nullable<DateTime>) {
  if (!date) {
    return;
  }

  if (date.kind !== "utc") {
    const utcDateValue = date.getTime() - date.getTimezoneOffset() * 60_000;
    date = new Date(utcDateValue);
    date.kind = "utc";
  }

  return date as UtcDateTime;
}

export function getDateInterval(date1: DateTime, date2: DateTime) {
  const timeIntervals = [31_536_000, 2_628_000, 604_800, 86_400, 3600, 60, 1];
  const intervalNames = ["year", "month", "week", "day", "hour", "minute", "second"] as const;
  const diff = Math.ceil((date1.getTime() - date2.getTime()) / 1000);
  const index = timeIntervals.findIndex(interval => Math.abs(diff) / interval >= 1);
  if (index === -1) {
    return { value: 0 };
  }

  const value = Math.round((diff / timeIntervals[index]) * 10) / 10;
  const { [index]: interval } = intervalNames;
  return { value, interval };
}
