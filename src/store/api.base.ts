import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { memoize } from "lodash";

import type { AppStoreState } from "./configure";
import { setUser } from "./slices/user";

const baseUrl = "http://ec2-18-194-242-209.eu-central-1.compute.amazonaws.com:8080/";

export const baseApi = createApi({
  baseQuery: (queryParameters: string | FetchArgs, api, extraOptions) => {
    const appFetchBaseQuery = createAppFetchBaseQuery(api.dispatch);
    return appFetchBaseQuery(queryParameters, api, extraOptions);
  },
  endpoints: () => ({}),
});

const createAppFetchBaseQuery = memoize((dispatch: BaseQueryApi["dispatch"]) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as AppStoreState;
      if (state?.user.accessToken) {
        headers.set("Authorization", `Bearer ${state.user.accessToken}`);
      }
    },
    responseHandler: async (response: Response) => {
      const { status, headers } = response;
      if (status === 401 || status === 403) {
        dispatch(setUser({}));
      }

      const contentType = headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return response.json();
      }

      return response.text();
    },
  }),
);
