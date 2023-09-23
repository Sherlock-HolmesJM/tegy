import { z } from "zod";

export const zodSchemas = {
  email: () => z.string({ required_error: "Email is required" }).email(),

  otp: () =>
    z.custom<string>((val: any) => {
      const value: string | undefined = val;
      if (!value || value.length !== 6) return false;

      if (value.split("").some((v) => isNaN(parseInt(v)))) return false;

      return true;
    }, "OTP must be 6 characters max and min."),

  password: () =>
    z
      .string({ required_error: "Password is required" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^~])[A-Za-z\d@$!%*?&#^~]{8,}$/, {
        message:
          "Password must be a minimum of eight (8) characters, including an uppercase letter, a lowercase letter, a number, and a symbol.",
      }),
};
