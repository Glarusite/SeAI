import { api } from "./api";
import AppSlice from "./slices/app";
import ScanSlice from "./slices/scan";
import UserSlice from "./slices/user";

export const reducer = {
  [api.reducerPath]: api.reducer,
  [AppSlice.name]: AppSlice.reducer,
  [ScanSlice.name]: ScanSlice.reducer,
  [UserSlice.name]: UserSlice.reducer,
};
