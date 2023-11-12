import { baseApi as api } from "./api.base";
export const addTagTypes = ["voyage-controller", "document-controller", "auth-controller"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
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
        query: queryArgument => ({ url: `/api/v1/auth/register`, method: "POST", body: queryArgument }),
        invalidatesTags: ["auth-controller"],
      }),
      authenticateAndGetToken: build.mutation<AuthenticateAndGetTokenApiResponse, AuthenticateAndGetTokenParameters>({
        query: queryArgument => ({ url: `/api/v1/auth/login`, method: "POST", body: queryArgument }),
        invalidatesTags: ["auth-controller"],
      }),
      saveDocument1: build.query<SaveDocument1ApiResponse, SaveDocument1Parameters>({
        query: queryArgument => ({ url: `/api/v1/users/${queryArgument}/documents` }),
        providesTags: ["document-controller"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
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
export type FindAllByUserApiResponse = /** status 200 OK */ Voyage[];
export type FindAllByUserParameters = string;
export type CreateVoyageApiResponse = unknown;
export type CreateVoyageParameters = {
  userId: string;
  createVoyageRequest: CreateVoyageRequest;
};
export type HandleFileUploadApiResponse = /** status 200 OK */ MarineDocument;
export type HandleFileUploadParameters = {
  userId: string;
  body: FormData;
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
export type RegisterParameters = UserRegisterRequest;
export type AuthenticateAndGetTokenApiResponse = /** status 200 OK */ AuthResponse;
export type AuthenticateAndGetTokenParameters = AuthRequest;
export type SaveDocument1ApiResponse = /** status 200 OK */ MarineDocument[];
export type SaveDocument1Parameters = string;
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
export type Voyage = {
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
export type AuthResponse = {
  userId?: string;
  accessToken?: string;
};
export type AuthRequest = {
  email: string;
  password: string;
};
export const {
  useUpdateVoyageMutation,
  useDeleteVoyageMutation,
  useFindAllByUserQuery,
  useCreateVoyageMutation,
  useHandleFileUploadMutation,
  useSaveDocumentMutation,
  useDiscardMutation,
  useRegisterMutation,
  useAuthenticateAndGetTokenMutation,
  useSaveDocument1Query,
} = injectedRtkApi;
