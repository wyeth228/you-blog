require("dotenv").config({ path: ".env." + process.env.NODE_ENV });

import { IPasswordEncodeConfig } from "../helpers/PasswordHash";
import { IVKConfig } from "./VKOAuth";
import { IJWTConfig } from "./JWTToken";
import { IGoogleConfig } from "./GoogleOAuth";

export const APP_CONFIG = {
  PORT: process.env.PORT,
  ORIGINS: ["http://localhost:3000"],
};

export const MYSQL_CONFIG = {
  HOST: process.env.MYSQL_HOST,
  USER: process.env.MYSQL_USER,
  DATABASE: process.env.MYSQL_DATABASE,
  PASSWORD: process.env.MYSQL_PASSWORD,
};

export const VK_CONFIG: IVKConfig = {
  CLIENT_ID: process.env.VK_CLIENT_ID,
  CLIENT_SECRET: process.env.VK_CLIENT_SECRET,
};

export const GOOGLE_CONFIG: IGoogleConfig = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
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
  ACCESS_TIME: Number(process.env.JWT_ACCESS_TIME),
  REFRESH_TIME: Number(process.env.JWT_REFRESH_TIME),
};
