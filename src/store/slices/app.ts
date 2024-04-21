import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { AppFlags } from "@src/models";

const initialState: AppState = {};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetAppValue(state: Draft<AppState>, { payload: name }: PayloadAction<keyof AppState>) {
      delete state[name];
    },

    setAppValue<TKey extends keyof AppState>(
      state: Draft<AppState>,
      { payload: { name, value } }: SetAppValuePayloadAction<TKey>,
    ) {
      state[name] = value;
    },
  },
});

export default AppSlice;
export const {
  actions: { resetAppValue, setAppValue },
} = AppSlice;
export type AppState = Readonly<Partial<AppFlags>>;

type SetAppValuePayloadAction<TKey extends keyof AppFlags> = PayloadAction<{
  name: TKey;
  value: AppFlags[TKey];
}>;
