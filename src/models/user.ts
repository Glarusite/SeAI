import type { AuthRequest, GetUserResponse, UserRegisterRequest } from "@src/store";

export interface LoginFormData extends AuthRequest {}

export interface PasswordResetFormData extends AuthRequest {
  repeatPassword: string;
}

export interface RegisterFormData extends Pick<UserRegisterRequest, "email" | "firstName" | "lastName" | "password"> {
  repeatPassword: string;
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
