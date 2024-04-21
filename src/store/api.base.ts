import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { memoize } from "lodash";

import type { AppStoreState } from "./configure";
import { resetAppValue } from "./slices/app";
import { setUser } from "./slices/user";

// eslint-disable-next-line prefer-destructuring
export const baseUrl = process.env.EXPO_PUBLIC_API_URL;

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
    prepareHeaders: (headers, { getState, endpoint }) => {
      const state = getState() as AppStoreState;
      if (!anonymousEndpoints.has(endpoint) && state?.user.accessToken) {
        headers.set("Authorization", `Bearer ${state.user.accessToken}`);
      }
    },
    responseHandler: async (response: Response) => {
      const { status, headers } = response;
      if (status === 401 || status === 403) {
        dispatch(setUser({}));
        dispatch(resetAppValue("nextLoginReminderTimestamp"));
      }

      const contentType = headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return response.json();
      }

      return response.text();
    },
  }),
);

// TODO: Make sure to not have to keep endpoint names updated
const anonymousEndpoints = new Set(["authenticateAndGetToken", "createUser"]);
