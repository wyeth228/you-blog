import { IJWTConfig, IPasswordEncodeConfig } from "../services/AuthService";
import { IVKConfig } from "./VKOAuth";

export const VK_CONFIG: IVKConfig = {
  ACCESS_TOKEN_URL: process.env.VK_ACCESS_TOKEN_URL,
  CLIENT_ID: process.env.VK_CLIENT_ID,
  CLIENT_SECRET: process.env.VK_CLIENT_SECRET,
  CLIENT_SERVICE_SECRET: process.env.CLIENT_SERVICE_SECRET,
};

export const PASSWORD_ENCODE_CONFIG: IPasswordEncodeConfig = {
  SALT: process.env.PASSWORD_SALT,
  ITERATIONS: Number(process.env.PASSWORD_ITERATIONS),
  KEYLEN: Number(process.env.PASSWORD_KEYLEN),
  ALG: process.env.PASSWORD_ALG,
};

export const JWT_CONFIG: IJWTConfig = {
  ISS: process.env.JWT_ISS,
  ACCESS_TIME: Number(process.env.JWT_ACCESS_TIME),
  REFRESH_TIME: Number(process.env.JWT_REFRESH_TIME),
  SECRET: process.env.JWT_SECRET,
};
