import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://ec2-18-194-242-209.eu-central-1.compute.amazonaws.com:8080/api/" }),
  endpoints: () => ({}),
});
