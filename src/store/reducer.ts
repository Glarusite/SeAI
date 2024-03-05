import { api } from "./api";
import AppSlice from "./slices/app";
import RemindersSlice from "./slices/reminders";
import ScanSlice from "./slices/scan";
import UserSlice from "./slices/user";

export const reducer = {
  [api.reducerPath]: api.reducer,
  [AppSlice.name]: AppSlice.reducer,
  [RemindersSlice.name]: RemindersSlice.reducer,
  [ScanSlice.name]: ScanSlice.reducer,
  [UserSlice.name]: UserSlice.reducer,
};
