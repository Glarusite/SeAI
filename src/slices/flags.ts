import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Flags } from "@src/models/flags";

const initialState: FlagsState = {};

const FlagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    setFlagValue<TKey extends keyof FlagsState>(
      state: Draft<FlagsState>,
      { payload: { name, value } }: SetFlagValuePayloadAction<TKey>,
    ) {
      state[name] = value;
    },
  },
});

export default FlagsSlice;
export const { setFlagValue } = FlagsSlice.actions;
export type FlagsState = Readonly<Partial<Flags>>;

type SetFlagValuePayloadAction<TKey extends keyof FlagsState> = PayloadAction<{
  name: TKey;
  value: FlagsState[TKey];
}>;
