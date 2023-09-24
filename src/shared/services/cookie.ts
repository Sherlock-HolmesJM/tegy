import Cookie from "js-cookie";

export enum CookieKeys {
  ACCESS_TOKEN = "tegy_access_token",
}

export const cookies = Cookie;

export const cookieConfig = () => {
  const date = new Date();
  date.setTime(date.getTime() + 10 * 60 * 60 * 1000);

  const isLocal = process.env.NODE_ENV !== "production";

  return {
    path: "/",
    domain: isLocal ? "localhost" : ".ccd.domains",
    expires: date,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  };
};
