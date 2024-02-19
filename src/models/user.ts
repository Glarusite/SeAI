import type { UserAuthentaicationRequest, GetUserResponse, UserRegisterRequest } from "@src/store";

export interface LoginFormData extends UserAuthentaicationRequest {}

export interface PasswordResetFormData extends UserAuthentaicationRequest {
  repeatPassword: string;
}

export interface RegisterFormData extends Pick<UserRegisterRequest, "email" | "firstName" | "lastName" | "password"> {
  repeatPassword: string;
  gdprAccepted: boolean;
}

export interface ProfileFormData extends Omit<GetUserResponse, "contractDuration" | "dateOfBirth" | "readinessDate"> {
  contractDuration?: string;
  dateOfBirth?: Date;
  readinessDate?: Date;
}

export interface User {
  accessToken: string;
  userId: string;
  email: string;
  role: "SEAFARER" | "TRAINING_CENTER_ADMIN" | "TRAINING_CENTER_USER";
}
