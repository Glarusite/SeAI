import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { Scan } from "@src/models";

const initialState: ScanState = {};

const ScanSlice = createSlice({
  name: "scan",
  initialState,
  reducers: {
    setScan: (_, { payload }: PayloadAction<Scan>) => payload,
    resetScan: () => initialState,
  },
});

export default ScanSlice;
export const {
  actions: { setScan, resetScan },
} = ScanSlice;

export type ScanState = Readonly<Partial<Scan>>;
