import axios from "axios";
import { RequestParams, RequestUrl, ContentTypes, StandardResponse } from "./constants";
import { CookieKeys, cookies } from "./cookie";

export class ApiClient {
  private static instance: ApiClient;

  private constructor() {}

  private baseUrl = RequestUrl;
  private token: string = "";

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) ApiClient.instance = new ApiClient();

    return ApiClient.instance;
  }

  public async request(url: string, config: RequestParams = {}): Promise<StandardResponse> {
    if (!url) throw new Error("Provide `url` to make a request.");
    config.type = config.type || "GET";

    const isRaw = url.includes("http") || url.includes("https");

    if (!isRaw) url = this.baseUrl + "/" + url;

    if (!this.token) this.token = cookies.get(CookieKeys.ACCESS_TOKEN) ?? "";

    this.log(url, config, undefined, "sent");

    try {
      const res = await axios({
        method: config.type,
        url,
        data: config.type !== "GET" ? config.data : undefined,
        params: config.type === "GET" ? config.data : undefined,
        headers: this.getHeaders(),
      });

      this.log(url, config, res.data, "success");

      return res.data as StandardResponse;
    } catch (e: any) {
      this.log(url, config, e, "error");
      throw e;
    }
  }

  // public resendOtp(email: string, otpType: OtpType) {
  //   return this.request({ type: "POST", endpoint: "resendOtp", data: { email, otpType } });
  // }

  private getHeaders(contentType: ContentTypes = ContentTypes.JSON): any {
    if (!this.token) return { "Content-Type": contentType };

    return {
      "Content-Type": contentType,
      "x-auth-token": this.token,
    };
  }

  private log(url: string, config: RequestParams, data: any, state: RequestState) {
    if (process.env.NODE_ENV === "production") return;

    const log = logger[state];
    log(url, config, data);
  }
}

type RequestState = "sent" | "success" | "error";

const logger: Record<RequestState, (url: string, config: RequestParams, data: any) => void> = {
  sent: (url: string, config: RequestParams) => {
    console.log(
      `🚀 %c${config.type} %crequest to: %c${url}\n✉%c:`,
      "color:orange;",
      "color:black;",
      "color:green;",
      "color:black;",
      `params: ${config.data}`
    );
  },

  success: (url: string, config: RequestParams, data: any) => {
    console.log(
      `✅ %csuccess %c${config.type} %crequest to: %c${url}\n✉%c:`,
      "color:green;font-size:15px;",
      "color:orange;",
      "color:black;",
      "color:green;",
      "color:black;",
      `params: ${config.data}`,
      "\n",
      " response 👉",
      data
    );
  },

  error: (url: string, config: RequestParams, error: any) => {
    console.log(
      `⛔ %cerror %c${config.type} %crequest to: %c${url}\n✉%c:`,
      "color:red;font-size:15px;",
      "color:orange;",
      "color:black;",
      "color:green;",
      "color:black;",
      `params: ${config.data}`,
      "\n",
      " message 👉",
      error?.message
    );
  },
};

export const apiClient = ApiClient.getInstance();
