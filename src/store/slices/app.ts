import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { AppFlags } from "@src/models";

const initialState: AppState = {};

const FlagsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppValue<TKey extends keyof AppState>(
      state: Draft<AppState>,
      { payload: { name, value } }: SetFlagValuePayloadAction<TKey>,
    ) {
      state[name] = value;
    },
  },
});

export default FlagsSlice;
export const {
  actions: { setAppValue },
} = FlagsSlice;
export type AppState = Readonly<Partial<AppFlags>>;

type SetFlagValuePayloadAction<TKey extends keyof AppState> = PayloadAction<{
  name: TKey;
  value: AppState[TKey];
}>;
