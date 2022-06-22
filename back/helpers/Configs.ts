require("dotenv").config({ path: ".env." + process.env.NODE_ENV });

import { IPasswordEncodeConfig } from "../services/AuthService";
import { IVKConfig } from "./VKOAuth";
import { IJWTConfig } from "./JWTToken";

export const VK_CONFIG: IVKConfig = {
  CLIENT_ID: process.env.VK_CLIENT_ID,
  CLIENT_SECRET: process.env.VK_CLIENT_SECRET,
};

export const PASSWORD_ENCODE_CONFIG: IPasswordEncodeConfig = {
  SALT: process.env.PASSWORD_SALT,
  ITERATIONS: Number(process.env.PASSWORD_ITERATIONS),
  KEYLEN: Number(process.env.PASSWORD_KEYLEN),
  ALG: process.env.PASSWORD_ALG,
};

export const JWT_CONFIG: IJWTConfig = {
  ISS: process.env.JWT_ISS,
  SECRET: process.env.JWT_SECRET,
};
