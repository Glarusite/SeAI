import { baseApi as api } from "./api.base";
export const addTagTypes = [
  "user-controller",
  "voyage-controller",
  "document-controller",
  "file-controller",
  "users-auth-controller",
  "training-center-controller",
  "online-course-controller",
  "online-course-file-controller",
  "course-controller",
  "training-center-auth-controller",
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
      deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserParameters>({
        query: queryArgument => ({ url: `/api/v1/users/${queryArgument}`, method: "DELETE" }),
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
        invalidatesTags: ["users-auth-controller"],
      }),
      createTrainingCenter: build.mutation<CreateTrainingCenterApiResponse, CreateTrainingCenterParameters>({
        query: queryArgument => ({ url: `/api/v1/training-centers`, method: "POST", body: queryArgument }),
        invalidatesTags: ["training-center-controller"],
      }),
      getAllOnlineCourses: build.query<GetAllOnlineCoursesApiResponse, GetAllOnlineCoursesParameters>({
        query: queryArgument => ({ url: `/api/v1/training-centers/${queryArgument}/online-courses` }),
        providesTags: ["online-course-controller"],
      }),
      createOnlineCourse: build.mutation<CreateOnlineCourseApiResponse, CreateOnlineCourseParameters>({
        query: queryArgument => ({
          url: `/api/v1/training-centers/${queryArgument.trainingCenterId}/online-courses`,
          method: "POST",
          body: queryArgument.createOnlineCourseRequest,
        }),
        invalidatesTags: ["online-course-controller"],
      }),
      download1: build.query<Download1ApiResponse, Download1Parameters>({
        query: queryArgument => ({
          url: `/api/v1/training-centers/${queryArgument.trainingCenterId}/online-courses/${queryArgument.courseId}/files`,
        }),
        providesTags: ["online-course-file-controller"],
      }),
      upload2: build.mutation<Upload2ApiResponse, Upload2Parameters>({
        query: queryArgument => ({
          url: `/api/v1/training-centers/${queryArgument.trainingCenterId}/online-courses/${queryArgument.courseId}/files`,
          method: "POST",
          body: queryArgument.body,
        }),
        invalidatesTags: ["online-course-file-controller"],
      }),
      delete2: build.mutation<Delete2ApiResponse, Delete2Parameters>({
        query: queryArgument => ({
          url: `/api/v1/training-centers/${queryArgument.trainingCenterId}/online-courses/${queryArgument.courseId}/files`,
          method: "DELETE",
        }),
        invalidatesTags: ["online-course-file-controller"],
      }),
      createCourse: build.mutation<CreateCourseApiResponse, CreateCourseParameters>({
        query: queryArgument => ({
          url: `/api/v1/training-centers/${queryArgument.trainingCenterId}/courses`,
          method: "POST",
          body: queryArgument.createCourseRequest,
        }),
        invalidatesTags: ["course-controller"],
      }),
      authenticateAndGetToken1: build.mutation<AuthenticateAndGetToken1ApiResponse, AuthenticateAndGetToken1Parameters>(
        {
          query: queryArgument => ({
            url: `/api/v1/training-centers/authentication`,
            method: "POST",
            body: queryArgument,
          }),
          invalidatesTags: ["training-center-auth-controller"],
        },
      ),
      getTrainingCenter: build.query<GetTrainingCenterApiResponse, GetTrainingCenterParameters>({
        query: queryArgument => ({ url: `/api/v1/training-centers/${queryArgument}` }),
        providesTags: ["training-center-controller"],
      }),
      getOnlineCourse: build.query<GetOnlineCourseApiResponse, GetOnlineCourseParameters>({
        query: queryArgument => ({
          url: `/api/v1/training-centers/${queryArgument.trainingCenterId}/online-courses/${queryArgument.courseId}`,
        }),
        providesTags: ["online-course-controller"],
      }),
      getAllCourses: build.query<GetAllCoursesApiResponse, GetAllCoursesParameters>({
        query: () => ({ url: `/api/v1/training-centers/courses` }),
        providesTags: ["course-controller"],
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
export type DeleteUserApiResponse = unknown;
export type DeleteUserParameters = string;
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
  body: FormData;
};
export type FindAllApiResponse = /** status 200 OK */ GetDocumentResponse[];
export type FindAllParameters = string;
export type CreateApiResponse = /** status 200 OK */ CreateDocumentResponse;
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
  body: FormData;
};
export type Delete1ApiResponse = unknown;
export type Delete1Parameters = {
  userId: string;
  documentId: string;
};
export type AuthenticateAndGetTokenApiResponse = /** status 200 OK */ UserAuthenticationResponse;
export type AuthenticateAndGetTokenParameters = UserAuthenticationRequest;
export type CreateTrainingCenterApiResponse = unknown;
export type CreateTrainingCenterParameters = CreateTrainingCenterRequest;
export type GetAllOnlineCoursesApiResponse = /** status 200 OK */ GetOnlineCourseResponse[];
export type GetAllOnlineCoursesParameters = string;
export type CreateOnlineCourseApiResponse = unknown;
export type CreateOnlineCourseParameters = {
  trainingCenterId: string;
  createOnlineCourseRequest: CreateOnlineCourseRequest;
};
export type Download1ApiResponse = /** status 200 OK */ StreamingResponseBody;
export type Download1Parameters = {
  trainingCenterId: string;
  courseId: string;
};
export type Upload2ApiResponse = unknown;
export type Upload2Parameters = {
  trainingCenterId: string;
  courseId: string;
  body: {
    file: Blob;
  };
};
export type Delete2ApiResponse = unknown;
export type Delete2Parameters = {
  trainingCenterId: string;
  courseId: string;
};
export type CreateCourseApiResponse = unknown;
export type CreateCourseParameters = {
  trainingCenterId: string;
  createCourseRequest: CreateCourseRequest;
};
export type AuthenticateAndGetToken1ApiResponse = /** status 200 OK */ TrainingCenterAuthenticationResponse;
export type AuthenticateAndGetToken1Parameters = TrainingCenterAuthenticationRequest;
export type GetTrainingCenterApiResponse = /** status 200 OK */ GetTrainingCenterResponse;
export type GetTrainingCenterParameters = string;
export type GetOnlineCourseApiResponse = /** status 200 OK */ GetOnlineCourseResponse;
export type GetOnlineCourseParameters = {
  trainingCenterId: string;
  courseId: string;
};
export type GetAllCoursesApiResponse = /** status 200 OK */ GetCourseResponse[];
export type GetAllCoursesParameters = void;
export type GetUserResponse = {
  firstName?: string;
  lastName?: string;
  rank?:
    | "CAPTAIN"
    | "CHIEF_OFFICER"
    | "FIRST_OFFICER"
    | "SECOND_OFFICER"
    | "THIRD_OFFICER"
    | "DECK_CADET"
    | "CHIEF_ENGINEER"
    | "FIRST_ENGINEER"
    | "SECOND_ENGINEER"
    | "THIRD_ENGINEER"
    | "FOURTH_ENGINEER"
    | "ELECTRO_TECHNICAL_OFFICER"
    | "BOATSWAIN"
    | "ABLE_SEAMAN"
    | "ORDINARY_SEAMAN"
    | "CHIEF_STEWARD"
    | "STEWARD"
    | "MESSMAN"
    | "FITTER"
    | "PUMPMAN"
    | "COOK"
    | "MOTORMAN"
    | "OILER"
    | "WELDER"
    | "REFRIGERATION_ENGINEER"
    | "TRAINEE_OFFICER"
    | "RADIO_OFFICER";
  presentEmployer?: string;
  dateOfBirth?: string;
  manningAgents?: string;
  status?: "ONBOARD" | "HOME";
  vesselType?:
    | "BULK_CARRIER"
    | "CONTAINER"
    | "CRUDE_OIL"
    | "PRODUCT_OIL"
    | "LPG"
    | "LNG"
    | "REEFER"
    | "RO_RO"
    | "GENERAL_CARGO"
    | "CRUISE"
    | "FERRY"
    | "OCEAN_LINER"
    | "CATAMARAN"
    | "MOTOR_YACHT"
    | "SAILING_YACHT"
    | "MEGA_YACHT"
    | "EXPLORER_YACHT"
    | "SPORT_FISHING_YACHT";
  homeAirport?: string;
  readinessDate?: string;
  contractDuration?: number;
};
export type UserUpdateRequest = {
  firstName?: string;
  lastName?: string;
  rank?:
    | "CAPTAIN"
    | "CHIEF_OFFICER"
    | "FIRST_OFFICER"
    | "SECOND_OFFICER"
    | "THIRD_OFFICER"
    | "DECK_CADET"
    | "CHIEF_ENGINEER"
    | "FIRST_ENGINEER"
    | "SECOND_ENGINEER"
    | "THIRD_ENGINEER"
    | "FOURTH_ENGINEER"
    | "ELECTRO_TECHNICAL_OFFICER"
    | "BOATSWAIN"
    | "ABLE_SEAMAN"
    | "ORDINARY_SEAMAN"
    | "CHIEF_STEWARD"
    | "STEWARD"
    | "MESSMAN"
    | "FITTER"
    | "PUMPMAN"
    | "COOK"
    | "MOTORMAN"
    | "OILER"
    | "WELDER"
    | "REFRIGERATION_ENGINEER"
    | "TRAINEE_OFFICER"
    | "RADIO_OFFICER";
  presentEmployer?: string;
  dateOfBirth?: string;
  manningAgents?: string;
  status?: "ONBOARD" | "HOME";
  vesselType?:
    | "BULK_CARRIER"
    | "CONTAINER"
    | "CRUDE_OIL"
    | "PRODUCT_OIL"
    | "LPG"
    | "LNG"
    | "REEFER"
    | "RO_RO"
    | "GENERAL_CARGO"
    | "CRUISE"
    | "FERRY"
    | "OCEAN_LINER"
    | "CATAMARAN"
    | "MOTOR_YACHT"
    | "SAILING_YACHT"
    | "MEGA_YACHT"
    | "EXPLORER_YACHT"
    | "SPORT_FISHING_YACHT";
  homeAirport?: string;
  readinessDate?: string;
  contractDuration?: number;
};
export type UpdateVoyageRequest = {
  vesselName?: string;
  vesselType?:
    | "BULK_CARRIER"
    | "CONTAINER"
    | "CRUDE_OIL"
    | "PRODUCT_OIL"
    | "LPG"
    | "LNG"
    | "REEFER"
    | "RO_RO"
    | "GENERAL_CARGO"
    | "CRUISE"
    | "FERRY"
    | "OCEAN_LINER"
    | "CATAMARAN"
    | "MOTOR_YACHT"
    | "SAILING_YACHT"
    | "MEGA_YACHT"
    | "EXPLORER_YACHT"
    | "SPORT_FISHING_YACHT";
  rank?:
    | "CAPTAIN"
    | "CHIEF_OFFICER"
    | "FIRST_OFFICER"
    | "SECOND_OFFICER"
    | "THIRD_OFFICER"
    | "DECK_CADET"
    | "CHIEF_ENGINEER"
    | "FIRST_ENGINEER"
    | "SECOND_ENGINEER"
    | "THIRD_ENGINEER"
    | "FOURTH_ENGINEER"
    | "ELECTRO_TECHNICAL_OFFICER"
    | "BOATSWAIN"
    | "ABLE_SEAMAN"
    | "ORDINARY_SEAMAN"
    | "CHIEF_STEWARD"
    | "STEWARD"
    | "MESSMAN"
    | "FITTER"
    | "PUMPMAN"
    | "COOK"
    | "MOTORMAN"
    | "OILER"
    | "WELDER"
    | "REFRIGERATION_ENGINEER"
    | "TRAINEE_OFFICER"
    | "RADIO_OFFICER";
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
  vesselType?:
    | "BULK_CARRIER"
    | "CONTAINER"
    | "CRUDE_OIL"
    | "PRODUCT_OIL"
    | "LPG"
    | "LNG"
    | "REEFER"
    | "RO_RO"
    | "GENERAL_CARGO"
    | "CRUISE"
    | "FERRY"
    | "OCEAN_LINER"
    | "CATAMARAN"
    | "MOTOR_YACHT"
    | "SAILING_YACHT"
    | "MEGA_YACHT"
    | "EXPLORER_YACHT"
    | "SPORT_FISHING_YACHT";
  rank?:
    | "CAPTAIN"
    | "CHIEF_OFFICER"
    | "FIRST_OFFICER"
    | "SECOND_OFFICER"
    | "THIRD_OFFICER"
    | "DECK_CADET"
    | "CHIEF_ENGINEER"
    | "FIRST_ENGINEER"
    | "SECOND_ENGINEER"
    | "THIRD_ENGINEER"
    | "FOURTH_ENGINEER"
    | "ELECTRO_TECHNICAL_OFFICER"
    | "BOATSWAIN"
    | "ABLE_SEAMAN"
    | "ORDINARY_SEAMAN"
    | "CHIEF_STEWARD"
    | "STEWARD"
    | "MESSMAN"
    | "FITTER"
    | "PUMPMAN"
    | "COOK"
    | "MOTORMAN"
    | "OILER"
    | "WELDER"
    | "REFRIGERATION_ENGINEER"
    | "TRAINEE_OFFICER"
    | "RADIO_OFFICER";
  imoNumber?: string;
  joiningPort?: string;
  joiningDate?: string;
  leavingPort?: string;
  leavingDate?: string;
  remarks?: string;
};
export type CreateVoyageRequest = {
  vesselName?: string;
  vesselType?:
    | "BULK_CARRIER"
    | "CONTAINER"
    | "CRUDE_OIL"
    | "PRODUCT_OIL"
    | "LPG"
    | "LNG"
    | "REEFER"
    | "RO_RO"
    | "GENERAL_CARGO"
    | "CRUISE"
    | "FERRY"
    | "OCEAN_LINER"
    | "CATAMARAN"
    | "MOTOR_YACHT"
    | "SAILING_YACHT"
    | "MEGA_YACHT"
    | "EXPLORER_YACHT"
    | "SPORT_FISHING_YACHT";
  rank?:
    | "CAPTAIN"
    | "CHIEF_OFFICER"
    | "FIRST_OFFICER"
    | "SECOND_OFFICER"
    | "THIRD_OFFICER"
    | "DECK_CADET"
    | "CHIEF_ENGINEER"
    | "FIRST_ENGINEER"
    | "SECOND_ENGINEER"
    | "THIRD_ENGINEER"
    | "FOURTH_ENGINEER"
    | "ELECTRO_TECHNICAL_OFFICER"
    | "BOATSWAIN"
    | "ABLE_SEAMAN"
    | "ORDINARY_SEAMAN"
    | "CHIEF_STEWARD"
    | "STEWARD"
    | "MESSMAN"
    | "FITTER"
    | "PUMPMAN"
    | "COOK"
    | "MOTORMAN"
    | "OILER"
    | "WELDER"
    | "REFRIGERATION_ENGINEER"
    | "TRAINEE_OFFICER"
    | "RADIO_OFFICER";
  imoNumber?: string;
  joiningPort?: string;
  joiningDate?: string;
  leavingPort?: string;
  leavingDate?: string;
  remarks?: string;
};
export type CreateDocumentResponse = {
  id?: string;
  name?: string;
  number?: string;
  issueDate?: string;
  expiryDate?: string;
  createdDate?: string;
  verified?: boolean;
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
export type UserAuthenticationRequest = {
  email: string;
  password: string;
};
export type CreateTrainingCenterRequest = {
  nameOfOrganization?: string;
  email?: string;
  password?: string;
  telephone1?: string;
  telephone2?: string;
  telephone3?: string;
};
export type GetOnlineCourseResponse = {
  name?: string;
  description?: string;
  duration?: {
    seconds?: number;
    zero?: boolean;
    nano?: number;
    negative?: boolean;
    units?: {
      durationEstimated?: boolean;
      timeBased?: boolean;
      dateBased?: boolean;
    }[];
  };
};
export type CreateOnlineCourseRequest = {
  name?: string;
  description?: string;
  duration?: {
    seconds?: number;
    zero?: boolean;
    nano?: number;
    negative?: boolean;
    units?: {
      durationEstimated?: boolean;
      timeBased?: boolean;
      dateBased?: boolean;
    }[];
  };
};
export type StreamingResponseBody = object;
export type LocalTime = {
  hour?: number;
  minute?: number;
  second?: number;
  nano?: number;
};
export type CreateCourseRequest = {
  name?: string;
  startDate?: string;
  endDate?: string;
  startTime?: LocalTime;
  endTime?: LocalTime;
  price?: number;
  currency?: {
    currencyCode?: string;
    symbol?: string;
    displayName?: string;
    defaultFractionDigits?: number;
    numericCode?: number;
    numericCodeAsString?: string;
  };
};
export type TrainingCenterAuthenticationResponse = {
  trainingCenterId?: string;
  accessToken?: string;
};
export type TrainingCenterAuthenticationRequest = {
  email: string;
  password: string;
};
export type GetTrainingCenterResponse = {
  id?: string;
  nameOfOrganization?: string;
  telephone1?: string;
  telephone2?: string;
  telephone3?: string;
};
export type GetCourseResponse = {
  id?: string;
  trainingCenterId?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  startTime?: LocalTime;
  endTime?: LocalTime;
  price?: number;
  currency?: string;
};
export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
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
  useCreateTrainingCenterMutation,
  useGetAllOnlineCoursesQuery,
  useCreateOnlineCourseMutation,
  useDownload1Query,
  useUpload2Mutation,
  useDelete2Mutation,
  useCreateCourseMutation,
  useAuthenticateAndGetToken1Mutation,
  useGetTrainingCenterQuery,
  useGetOnlineCourseQuery,
  useGetAllCoursesQuery,
} = injectedRtkApi;
