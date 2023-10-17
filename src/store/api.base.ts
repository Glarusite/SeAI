import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getAsyncStorageState } from "./async-storage";

const baseUrl = "http://ec2-18-194-242-209.eu-central-1.compute.amazonaws.com:8080/";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async headers => {
      const state = await getAsyncStorageState();
      if (state?.user.accessToken) {
        headers.set("Authorization", `Bearer ${state.user.accessToken}`);
      }
    },
  }),
  endpoints: () => ({}),
});
