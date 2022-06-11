import { Buffer } from "buffer";
import * as express from "express";
import * as Crypto from "crypto";
import { FilterXSS } from "xss";
import { Connection } from "mysql2/promise";
import Axios from "axios";

import AuthConrtoller from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import { UsersMySQLRepository } from "../repositories/UsersMySQLRepository";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import { ApiResponseHandler } from "../helpers/ApiResponseHandler";
import JWTToken from "../helpers/JWTToken";
import Base64 from "../helpers/Base64";

const getAuthRouter = (mySQLConnection: Connection): express.Router => {
  const router: express.Router = express.Router();
  const jwtToken: JWTToken = new JWTToken(Crypto, new Base64(Buffer));

  const authController: AuthConrtoller = new AuthConrtoller(
    new AuthService(
      new UsersMySQLRepository(mySQLConnection),
      Crypto,
      jwtToken,
      Axios,
      {
        SALT: process.env.PASSWORD_SALT,
        ITERATIONS: Number(process.env.PASSWORD_ITERATIONS),
        KEYLEN: Number(process.env.PASSWORD_KEYLEN),
        ALG: process.env.PASSWORD_ALG,
      },
      {
        ISS: process.env.JWT_ISS,
        ACCESS_TIME: Number(process.env.JWT_ACCESS_TIME),
        REFRESH_TIME: Number(process.env.JWT_REFRESH_TIME),
        SECRET: process.env.JWT_SECRET,
      },
      {
        ACCESS_TOKEN_URL: process.env.VK_ACCESS_TOKEN_URL,
        CLIENT_ID: process.env.VK_CLIENT_ID,
        CLIENT_SECRET: process.env.VK_CLIENT_SECRET,
        CLIENT_SERVICE_SECRET: process.env.CLIENT_SERVICE_SECRET,
      }
    ),
    new ValidUserCredentials(),
    new ApiResponseHandler(),
    new FilterXSS()
  );

  router.post("/signin", authController.signIn.bind(authController));
  router.post("/signup", authController.signUp.bind(authController));
  router.post("/vk", authController.authWithVK.bind(authController));
  router.post("/google", authController.authWithGoogle.bind(authController));

  return router;
};

export default getAuthRouter;
