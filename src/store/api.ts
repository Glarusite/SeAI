import { baseApi as api } from "./api.base";
export const addTagTypes = [
  "user-controller",
  "voyage-controller",
  "document-controller",
  "file-controller",
  "auth-controller",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getUser: build.query<GetUserApiResponse, GetUserParameters>({
        query: queryArgument => ({ url: `/api/v1/users/${queryArgument}` }),
        providesTags: ["user-controller"],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}`,
          method: "PUT",
          body: queryArgument.userUpdateRequest,
        }),
        invalidatesTags: ["user-controller"],
      }),
      updateVoyage: build.mutation<UpdateVoyageApiResponse, UpdateVoyageParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/voyages/${queryArgument.voyageId}`,
          method: "PUT",
          body: queryArgument.updateVoyageRequest,
        }),
        invalidatesTags: ["voyage-controller"],
      }),
      deleteVoyage: build.mutation<DeleteVoyageApiResponse, DeleteVoyageParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/voyages/${queryArgument.voyageId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["voyage-controller"],
      }),
      find: build.query<FindApiResponse, FindParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents/${queryArgument.documentId}`,
        }),
        providesTags: ["document-controller"],
      }),
      update: build.mutation<UpdateApiResponse, UpdateParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents/${queryArgument.documentId}`,
          method: "PUT",
          body: queryArgument.updateDocumentRequest,
        }),
        invalidatesTags: ["document-controller"],
      }),
      deleteApiV1UsersByUserIdDocumentsAndDocumentId: build.mutation<
        DeleteApiV1UsersByUserIdDocumentsAndDocumentIdApiResponse,
        DeleteApiV1UsersByUserIdDocumentsAndDocumentIdParameters
      >({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents/${queryArgument.documentId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["document-controller"],
      }),
      createUser: build.mutation<CreateUserApiResponse, CreateUserParameters>({
        query: queryArgument => ({ url: `/api/v1/users`, method: "POST", body: queryArgument }),
        invalidatesTags: ["user-controller"],
      }),
      findAllByUser: build.query<FindAllByUserApiResponse, FindAllByUserParameters>({
        query: queryArgument => ({ url: `/api/v1/users/${queryArgument}/voyages` }),
        providesTags: ["voyage-controller"],
      }),
      createVoyage: build.mutation<CreateVoyageApiResponse, CreateVoyageParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/voyages`,
          method: "POST",
          body: queryArgument.createVoyageRequest,
        }),
        invalidatesTags: ["voyage-controller"],
      }),
      upload: build.mutation<UploadApiResponse, UploadParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/ocr`,
          method: "POST",
          body: queryArgument.body,
        }),
        invalidatesTags: ["document-controller"],
      }),
      findAll: build.query<FindAllApiResponse, FindAllParameters>({
        query: queryArgument => ({ url: `/api/v1/users/${queryArgument}/documents` }),
        providesTags: ["document-controller"],
      }),
      create: build.mutation<CreateApiResponse, CreateParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents`,
          method: "POST",
          body: queryArgument.createDocumentRequest,
        }),
        invalidatesTags: ["document-controller"],
      }),
      download: build.query<DownloadApiResponse, DownloadParameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents/${queryArgument.documentId}/files`,
        }),
        providesTags: ["file-controller"],
      }),
      upload1: build.mutation<Upload1ApiResponse, Upload1Parameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents/${queryArgument.documentId}/files`,
          method: "POST",
          body: queryArgument.body,
        }),
        invalidatesTags: ["file-controller"],
      }),
      delete1: build.mutation<Delete1ApiResponse, Delete1Parameters>({
        query: queryArgument => ({
          url: `/api/v1/users/${queryArgument.userId}/documents/${queryArgument.documentId}/files`,
          method: "DELETE",
        }),
        invalidatesTags: ["file-controller"],
      }),
      authenticateAndGetToken: build.mutation<AuthenticateAndGetTokenApiResponse, AuthenticateAndGetTokenParameters>({
        query: queryArgument => ({ url: `/api/v1/users/authentication`, method: "POST", body: queryArgument }),
        invalidatesTags: ["auth-controller"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type GetUserApiResponse = /** status 200 OK */ GetUserResponse;
export type GetUserParameters = string;
export type UpdateUserApiResponse = unknown;
export type UpdateUserParameters = {
  userId: string;
  userUpdateRequest: UserUpdateRequest;
};
export type UpdateVoyageApiResponse = unknown;
export type UpdateVoyageParameters = {
  userId: string;
  voyageId: string;
  updateVoyageRequest: UpdateVoyageRequest;
};
export type DeleteVoyageApiResponse = unknown;
export type DeleteVoyageParameters = {
  userId: string;
  voyageId: string;
};
export type FindApiResponse = /** status 200 OK */ GetDocumentResponse;
export type FindParameters = {
  userId: string;
  documentId: string;
};
export type UpdateApiResponse = unknown;
export type UpdateParameters = {
  userId: string;
  documentId: string;
  updateDocumentRequest: UpdateDocumentRequest;
};
export type DeleteApiV1UsersByUserIdDocumentsAndDocumentIdApiResponse = unknown;
export type DeleteApiV1UsersByUserIdDocumentsAndDocumentIdParameters = {
  userId: string;
  documentId: string;
};
export type CreateUserApiResponse = unknown;
export type CreateUserParameters = UserRegisterRequest;
export type FindAllByUserApiResponse = /** status 200 OK */ GetVoyageResponse[];
export type FindAllByUserParameters = string;
export type CreateVoyageApiResponse = unknown;
export type CreateVoyageParameters = {
  userId: string;
  createVoyageRequest: CreateVoyageRequest;
};
export type UploadApiResponse = /** status 200 OK */ GetDocumentResponse;
export type UploadParameters = {
  userId: string;
  body: {
    file: Blob;
  };
};
export type FindAllApiResponse = /** status 200 OK */ GetDocumentResponse[];
export type FindAllParameters = string;
export type CreateApiResponse = unknown;
export type CreateParameters = {
  userId: string;
  createDocumentRequest: CreateDocumentRequest;
};
export type DownloadApiResponse = /** status 200 OK */ string[];
export type DownloadParameters = {
  userId: string;
  documentId: string;
};
export type Upload1ApiResponse = unknown;
export type Upload1Parameters = {
  userId: string;
  documentId: string;
  body: {
    file: Blob;
  };
};
export type Delete1ApiResponse = unknown;
export type Delete1Parameters = {
  userId: string;
  documentId: string;
};
export type AuthenticateAndGetTokenApiResponse = /** status 200 OK */ UserAuthenticationResponse;
export type AuthenticateAndGetTokenParameters = UserAuthentaicationRequest;
export type GetUserResponse = {
  firstName?: string;
  lastName?: string;
  rank?: "CAPTAIN";
  presentEmployer?: string;
  dateOfBirth?: string;
  manningAgents?: string;
  status?: "ONBOARD" | "HOME";
  vesselType?: "OIL_TANKER";
  homeAirport?: string;
  readinessDate?: string;
  contractDuration?: number;
};
export type UserUpdateRequest = {
  firstName?: string;
  lastName?: string;
  rank?: "CAPTAIN";
  presentEmployer?: string;
  dateOfBirth?: string;
  manningAgents?: string;
  status?: "ONBOARD" | "HOME";
  vesselType?: "OIL_TANKER";
  homeAirport?: string;
  readinessDate?: string;
  contractDuration?: number;
};
export type UpdateVoyageRequest = {
  vesselName?: string;
  rank?: "CAPTAIN";
  imoNumber?: string;
  joiningPort?: string;
  joiningDate?: string;
  leavingPort?: string;
  leavingDate?: string;
  remarks?: string;
};
export type GetDocumentResponse = {
  id?: string;
  name?: string;
  number?: string;
  issueDate?: string;
  expiryDate?: string;
  createdDate?: string;
  verified?: boolean;
};
export type UpdateDocumentRequest = {
  name?: string;
  number?: string;
  issueDate?: string;
  expiryDate?: string;
  verified?: boolean;
};
export type UserRegisterRequest = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
export type GetVoyageResponse = {
  id?: string;
  vesselName?: string;
  rank?: "CAPTAIN";
  imoNumber?: string;
  joiningPort?: string;
  joiningDate?: string;
  leavingPort?: string;
  leavingDate?: string;
  remarks?: string;
};
export type CreateVoyageRequest = {
  vesselName?: string;
  rank?: "CAPTAIN";
  imoNumber?: string;
  joiningPort?: string;
  joiningDate?: string;
  leavingPort?: string;
  leavingDate?: string;
  remarks?: string;
};
export type CreateDocumentRequest = {
  name?: string;
  number?: string;
  issueDate?: string;
  expiryDate?: string;
  verified?: boolean;
};
export type UserAuthenticationResponse = {
  userId?: string;
  accessToken?: string;
};
export type UserAuthentaicationRequest = {
  email: string;
  password: string;
};
export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateVoyageMutation,
  useDeleteVoyageMutation,
  useFindQuery,
  useUpdateMutation,
  useDeleteApiV1UsersByUserIdDocumentsAndDocumentIdMutation,
  useCreateUserMutation,
  useFindAllByUserQuery,
  useCreateVoyageMutation,
  useUploadMutation,
  useFindAllQuery,
  useCreateMutation,
  useDownloadQuery,
  useUpload1Mutation,
  useDelete1Mutation,
  useAuthenticateAndGetTokenMutation,
} = injectedRtkApi;
