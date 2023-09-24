import axios from "axios";
import { RequestParams, RequestUrl, ContentTypes, StandardResponse, RequestType } from "./constants";
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

    this.log(url, config.type, config.data, "sent");

    try {
      const res = await axios({
        method: config.type,
        url,
        data: config.type !== "GET" ? config.data : undefined,
        params: config.type === "GET" ? config.data : undefined,
        headers: this.getHeaders(),
      });

      this.log(url, config.type, { data: [{ name: "justice" }] }, "success");

      return res.data as StandardResponse;
    } catch (e: any) {
      this.log(url, config.type, e, "error");
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

  private log(url: string, type: RequestType, data: any, state: "sent" | "success" | "error") {
    if (process.env.NODE_ENV === "production") return;

    console.log(
      `${LogPrefix[state]} %c${type} %crequest to: %c${url}\n✉%c:`,
      LogColors[state],
      "color:orange;",
      LogColors[state],
      "color:orange;",
      data
    );
  }
}

const LogPrefix = {
  sent: "🚀",
  success: "✅ %csuccess",
  error: "⛔ %cerror",
};

const LogColors = {
  sent: "color:skyblue;",
  success: "color:green;",
  error: "color:red;",
};

export const apiClient = ApiClient.getInstance();
