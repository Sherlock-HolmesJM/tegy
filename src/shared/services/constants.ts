export type RequestType = "PUT" | "GET" | "POST" | "DELETE";

export type RequestEndpoint = string;

export enum OtpType {
  PasswordRest = "PASSWORD_RESET_TOKEN",
  RefreshToken = "REFRESH_TOKEN",
  AuthToken = "OTP_AUTH_TOKEN", // General
}

export enum ContentTypes {
  JSON = "application/json",
  FORM_URLENCODED = "application/x-www-form-urlencoded",
  MULTIPART_FORM_DATA = "multipart/form-data",
}

export type RequestParams = {
  type: RequestType;
  endpoint?: RequestEndpoint;
  url?: string;
  data?: any;
  contentType?: ContentTypes;
};

export enum LocalStorageKeys {}

export enum SessionKeys {
  ACCESS_TOKEN = "access_token",
  REDIRECT_ACTION = "redirect_action",
}

export type StandardResponse = {
  status: number;
  message: string;
  data: any;
  error?: any;
};

const BaseUrl = process.env.BASE_URL;

export const RequestUrl = `${BaseUrl}/api`;
