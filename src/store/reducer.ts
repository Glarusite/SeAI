import { api } from "./api";
import FlagsSlice from "./slices/app";
import UserSlice from "./slices/user";

export const reducer = {
  [api.reducerPath]: api.reducer,
  [FlagsSlice.name]: FlagsSlice.reducer,
  [UserSlice.name]: UserSlice.reducer,
};
