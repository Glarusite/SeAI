import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://ec2-18-194-242-209.eu-central-1.compute.amazonaws.com:8080/";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
});
