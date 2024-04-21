import type { UserAuthenticationRequest, GetUserResponse, UserRegisterRequest } from "@src/store";

import type { DropDownList } from "./app";

export interface LoginFormData extends UserAuthenticationRequest {}

export interface PasswordResetFormData extends UserAuthenticationRequest {
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

export type UserStatus = Required<GetUserResponse>["status"];

export const statusLabels: Record<UserStatus, string> = {
  HOME: "Home",
  ONBOARD: "On board",
};

export const statusList: DropDownList<UserStatus> = [
  { label: "Not selected", value: "" },
  ...Object.entries(statusLabels).map(([key, label]) => ({
    value: key as UserStatus,
    label,
  })),
];
