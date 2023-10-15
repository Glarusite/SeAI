import { ConfigFile } from "@rtk-query/codegen-openapi";

const ApiConfig: ConfigFile = {
  schemaFile: "http://ec2-18-194-242-209.eu-central-1.compute.amazonaws.com:8080/v3/api-docs",
  apiFile: "./src/store/api.base.ts",
  apiImport: "baseApi",
  outputFile: "./src/store/api.ts",
  exportName: "api",
  argSuffix: "Parameters",
  tag: true,
  hooks: true,
  flattenArg: true,
};

export default ApiConfig;
