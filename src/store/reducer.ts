import FlagsSlice from "@src/slices/flags";
import UserSlice from "@src/slices/user";

import { api } from "./api";

export const reducer = {
  [api.reducerPath]: api.reducer,
  [FlagsSlice.name]: FlagsSlice.reducer,
  [UserSlice.name]: UserSlice.reducer,
};
