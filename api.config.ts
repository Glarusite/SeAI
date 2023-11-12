import type { ConfigFile } from "@rtk-query/codegen-openapi";

const ApiConfig: ConfigFile = {
  schemaFile: `${process.env.EXPO_PUBLIC_API_URL}/v3/api-docs`,
  apiFile: "./src/store/api.base.ts",
  apiImport: "baseApi",
  outputFile: "./src/store/api.ts",
  exportName: "api",
  argSuffix: "Parameters",
  tag: true,
  hooks: true,
  flattenArg: true,
  filterEndpoints: endpoint => endpoint !== "download",
};

export default ApiConfig;
