import axios from "axios";
import { RequestParams, RequestUrl, ContentTypes, StandardResponse } from "./constants";
import { CookieKeys, cookies } from "./cookie";

export class ApiClient {
  private static instance: ApiClient;

  private constructor() {}

  public baseUrl = RequestUrl;
  public token: string = "";

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) ApiClient.instance = new ApiClient();

    return ApiClient.instance;
  }

  public async request(req: RequestParams): Promise<StandardResponse> {
    if (!req.endpoint && !req.url) throw new Error("Provide `endpoint` or `url` to make a request.");

    const url = req.endpoint ? this.baseUrl + "/" + req.endpoint : req.url;

    if (!this.token) this.token = cookies.get(CookieKeys.ACCESS_TOKEN) ?? "";

    try {
      const res = await axios({
        method: req.type,
        url,
        data: req.type !== "GET" ? req.data : undefined,
        params: req.type === "GET" ? req.data : undefined,
        headers: this.getHeaders(),
      });

      return res.data as StandardResponse;
    } catch (e: any) {
      const data = e.response?.data ?? { message: e.message };
      throw { ...data, status: e.response?.status };
    }
  }

  // public resendOtp(email: string, otpType: OtpType) {
  //   return this.request({ type: "POST", endpoint: "resendOtp", data: { email, otpType } });
  // }

  private getHeaders(contentType: ContentTypes = ContentTypes.JSON): any {
    // if (!this.token) return { Accept: "*/*" };

    return {
      "Content-Type": contentType,
      "x-auth-token": this.token,
    };
  }
}

export const apiClient = ApiClient.getInstance();
