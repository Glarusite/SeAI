import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Flags } from "@src/models/flags";

export type FlagsState = Readonly<Partial<Flags>>;

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

const { reducer: flags, actions } = FlagsSlice;
export default flags;
export const { setFlagValue } = actions;

type SetFlagValuePayloadAction<TKey extends keyof FlagsState> = PayloadAction<{
  name: TKey;
  value: FlagsState[TKey];
}>;
