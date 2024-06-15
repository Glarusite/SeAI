import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { ReminderPeriod } from "@src/models";

const initialState: RemindersState = {
  documents: {},
};

export interface RemindersState {
  documents: Record<string, ReminderPeriod | undefined>;
}

const RemindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    setDocumentReminder(state, { payload: { id, period } }: SetDocumentReminderPayloadAction) {
      state.documents[id] = { ...period };
    },
    resetAllReminders: () => initialState,
  },
});

export default RemindersSlice;
export const {
  actions: { setDocumentReminder, resetAllReminders },
} = RemindersSlice;

export type SetDocumentReminderPayloadAction = PayloadAction<DocumentReminder>;

export type DocumentReminder = {
  id: string;
  period: ReminderPeriod;
};
