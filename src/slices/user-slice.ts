import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@src/models/user";

export type UserState = Readonly<Partial<User>>;

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

const { reducer: user, actions } = UserSlice;
export default user;
export const { setUser } = actions;
