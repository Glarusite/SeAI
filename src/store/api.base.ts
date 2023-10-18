import { FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AppStore, AppStoreState } from "./configure";
import { setUser } from "./slices/user";

const baseUrl = "http://ec2-18-194-242-209.eu-central-1.compute.amazonaws.com:8080/";

export const baseApi = createApi({
  baseQuery: (queryParameters: FetchArgs, api, extraOptions) => {
    const dispatch = api.dispatch as AppStore["dispatch"];
    const appFetchQuery = fetchBaseQuery({
      baseUrl,
      responseHandler: async response => {
        console.log(response.status);
        if (response.status === 403) {
          console.log("403");
          dispatch(setUser({}));
        }

        if (response.status >= 400) {
          return response.text();
        }

        return response.json();
      },
      prepareHeaders: (headers, { getState }) => {
        const state = getState() as AppStoreState;
        if (state?.user.accessToken) {
          headers.set("Authorization", `Bearer ${state.user.accessToken}`);
        }
      },
    });

    return appFetchQuery(queryParameters, api, extraOptions);
  },
  endpoints: () => ({}),
});
