import { TypeScaleStr, ResponsiveProp, FontWeightKey, FontFamilyKey } from "./types";
import { FontFamilies, FontWeights } from "./constants";
import { DeviceBoolean } from "@/shared/styles";

export const typographyProps = (typo?: TypeScaleStr, fontFamily?: FontFamilyKey) => {
  const scales = getScaleFromType(typo);

  return {
    ...scales,
    fontFamily: fontFamily ? FontFamilies[fontFamily] : scales.fontFamily,
  };
};

export const getScaleFromType = (type: TypeScaleStr = "10r10") => {
  let [typo, ff] = type.split("-") as [TypeScaleStr, FontFamilyKey | undefined];

  const [fs, lh] = getNumsFromStr(type); // fontSize, lineHeight (lh = optional)

  const weight = typo.replace(fs as any, "").replace(lh as any, "") as FontWeightKey;

  // fontSize>=24 is title,and should use Clash Display Font Family.
  if (!ff) ff = fs < 24 ? "inter" : "clashDisplay";

  return {
    // fontSize: fontSize / 16 + "rem", // 16 is based on 16px set on the body element.
    fontSize: fs + "px",
    lineHeight: lh ? lh + "px" : undefined,
    fontWeight: FontWeights[weight],
    fontFamily: FontFamilies[ff],
    // as: tag,
  };
};

export const reduceProp = <Type>(device: DeviceBoolean, prop?: Type | ResponsiveProp<Type>) => {
  let value = undefined as Type | undefined;

  if (typeof prop === "object" && isResponsiveProp(prop as any)) {
    const { xs, sm, md, lg } = prop as ResponsiveProp<Type>;

    if (device.xs) value = xs ?? sm ?? md ?? lg;
    else if (device.sm) value = sm ?? md ?? lg;
    else if (device.md) value = md ?? lg;
    else value = lg;

    // else value = lg ?? md ?? sm ?? xs
  } else {
    value = prop as Type;
  }

  // Note: value is the smallest available at each breakpoint or the single value provided.
  return value;
};

export const isResponsiveProp = (obj: Record<string, any>) => {
  const keys = ["lg", "md", "sm", "xs"].map((key) => obj.hasOwnProperty(key));

  if (keys.some((isTrue) => isTrue)) return true;

  return false;
};

const getNumsFromStr = (str: string) => {
  const res = str.match(/\d+/g);

  if (!res) return [];

  return res.map((value) => +value);
};

/**
 * const getTagToRender = (fontSize: number) => {
  // Note: this part has nothing to do with style-guide from designers.

  if (fontSize >= 70) return "h1" // 70 and above
  else if (fontSize >= 60) return "h2" // 60 to 69
  else if (fontSize >= 50) return "h3" // 50 to 59
  else if (fontSize >= 40) return "h4" // 40 to 49
  else if (fontSize >= 30) return "h5" // 30 to 39
  else if (fontSize >= 24) return "h6" // 24 to 29
  else return "p"
}

 */
