import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@src/models/user";

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
export const { setUser } = UserSlice.actions;
export type UserState = Readonly<Partial<User>>;
