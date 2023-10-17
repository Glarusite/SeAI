import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Flags } from "@src/models";

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
export type AppState = Readonly<Partial<Flags>>;

type SetFlagValuePayloadAction<TKey extends keyof AppState> = PayloadAction<{
  name: TKey;
  value: AppState[TKey];
}>;
