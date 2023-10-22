import { AuthRequest, UserRegisterRequest } from "@src/store";

export interface LoginFormData extends AuthRequest {}

export interface RegisterFormData extends UserRegisterRequest {
  repeatPassword: string;
}

export interface User {
  accessToken: string;
  userId: string;
  email: string;
}
