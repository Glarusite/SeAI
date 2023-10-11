import { api } from "./api.base";
export const addTagTypes = ["document-controller", "auth-controller"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      handleFileUpload: build.mutation<HandleFileUploadApiResponse, HandleFileUploadParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/ocr`,
          method: "POST",
          body: queryArgument.body,
        }),
        invalidatesTags: ["document-controller"],
      }),
      saveDocument: build.mutation<SaveDocumentApiResponse, SaveDocumentParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents/${queryArgument.documentId}/verify`,
          method: "POST",
          body: queryArgument.marineDocument,
        }),
        invalidatesTags: ["document-controller"],
      }),
      discard: build.mutation<DiscardApiResponse, DiscardParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents/${queryArgument.documentId}/discard`,
          method: "POST",
        }),
        invalidatesTags: ["document-controller"],
      }),
      register: build.mutation<RegisterApiResponse, RegisterParameters>({
        query: queryArgument => ({
          url: `/api/v1/auth/register`,
          method: "POST",
          body: queryArgument.userRegisterRequest,
        }),
        invalidatesTags: ["auth-controller"],
      }),
      authenticateAndGetToken: build.mutation<AuthenticateAndGetTokenApiResponse, AuthenticateAndGetTokenParameters>({
        query: queryArgument => ({ url: `/api/v1/auth/login`, method: "POST", body: queryArgument.authRequest }),
        invalidatesTags: ["auth-controller"],
      }),
      saveDocument1: build.query<SaveDocument1ApiResponse, SaveDocument1Parameters>({
        query: queryArgument => ({ url: `/api/v1/users/${queryArgument.userId}/documents` }),
        providesTags: ["document-controller"],
      }),
      download: build.query<DownloadApiResponse, DownloadParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents/${queryArgument.documentId}/download`,
        }),
        providesTags: ["document-controller"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type HandleFileUploadApiResponse = /** status 200 OK */ MarineDocument;
export type HandleFileUploadParameters = {
  userId: string;
  body: {
    file: Blob;
  };
};
export type SaveDocumentApiResponse = unknown;
export type SaveDocumentParameters = {
  userId: string;
  documentId: string;
  marineDocument: MarineDocument;
};
export type DiscardApiResponse = unknown;
export type DiscardParameters = {
  userId: string;
  documentId: string;
};
export type RegisterApiResponse = unknown;
export type RegisterParameters = {
  userRegisterRequest: UserRegisterRequest;
};
export type AuthenticateAndGetTokenApiResponse = /** status 200 OK */ AuthResponse;
export type AuthenticateAndGetTokenParameters = {
  authRequest: AuthRequest;
};
export type SaveDocument1ApiResponse = /** status 200 OK */ MarineDocument[];
export type SaveDocument1Parameters = {
  userId: string;
};
export type DownloadApiResponse = /** status 200 OK */ string[];
export type DownloadParameters = {
  userId: string;
  documentId: string;
};
export type MarineDocument = {
  id?: string;
  name?: string;
  number?: string;
  issueDate?: string;
  expiryDate?: string;
  createdDate?: string;
  path?: string;
  verified?: boolean;
};
export type UserRegisterRequest = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
export type AuthResponse = {
  userId?: string;
  accessToken?: string;
};
export type AuthRequest = {
  email: string;
  password: string;
};
