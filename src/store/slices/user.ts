import type { Draft, PayloadAction } from "@reduxjs/toolkit";
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

    setUserValue: <TKey extends keyof UserState>(
      state: Draft<UserState>,
      { payload: { key, value } }: PayloadAction<{ key: TKey; value: UserState[TKey] }>,
    ) => {
      state[key] = value;
    },
  },
});

export default UserSlice;
export const {
  actions: { setUser, setUserValue },
} = UserSlice;
export type UserState = Readonly<Partial<User>>;
