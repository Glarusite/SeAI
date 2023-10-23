import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@src/models";

const initialState: UserState = {};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, { payload: user }: PayloadAction<UserState>) => {
      return user;
    },
  },
});

export default UserSlice;
export const {
  actions: { setUser },
} = UserSlice;
export type UserState = Readonly<Partial<User>>;
