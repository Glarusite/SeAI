import { api } from "./api";
import FlagsSlice from "./slices/app";
import ScanSlice from "./slices/scan";
import UserSlice from "./slices/user";

export const reducer = {
  [api.reducerPath]: api.reducer,
  [FlagsSlice.name]: FlagsSlice.reducer,
  [ScanSlice.name]: ScanSlice.reducer,
  [UserSlice.name]: UserSlice.reducer,
};
