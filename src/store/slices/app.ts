import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { AppFlags } from "@src/models";

const initialState: AppState = {};

const AppSlice = createSlice({
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

export default AppSlice;
export const {
  actions: { setAppValue },
} = AppSlice;
export type AppState = Readonly<Partial<AppFlags>>;

type SetFlagValuePayloadAction<TKey extends keyof AppState> = PayloadAction<{
  name: TKey;
  value: AppState[TKey];
}>;
