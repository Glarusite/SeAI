import type { Nullable } from "@src/models";

import { isValidDate } from "./validators";

export function toDate(value: Nullable<string>) {
  if (value != null) {
    const date = new Date(value);
    if (isValidDate(date)) {
      return date;
    }
  }
}
