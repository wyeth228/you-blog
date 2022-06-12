import { Buffer } from "buffer";
import * as express from "express";
import * as Crypto from "crypto";
import { FilterXSS } from "xss";
import { Connection } from "mysql2/promise";
import Axios from "axios";

import AuthConrtoller from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { UsersMySQLRepository } from "../repositories/UsersMySQLRepository";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import { ApiResponseHandler } from "../helpers/ApiResponseHandler";
import JWTToken from "../helpers/JWTToken";
import Base64 from "../helpers/Base64";
import { VKOAuth } from "../helpers/VKOAuth";
import {
  VK_CONFIG,
  PASSWORD_ENCODE_CONFIG,
  JWT_CONFIG,
} from "../helpers/Configs";

const getAuthRouter = (mySQLConnection: Connection): express.Router => {
  const router: express.Router = express.Router();
  const jwtToken: JWTToken = new JWTToken(Crypto, new Base64(Buffer));

  const authController: AuthConrtoller = new AuthConrtoller(
    new AuthService(
      new UsersMySQLRepository(mySQLConnection),
      new ValidUserCredentials(),
      new FilterXSS(),
      Crypto,
      jwtToken,
      new VKOAuth(VK_CONFIG, Axios),
      PASSWORD_ENCODE_CONFIG,
      JWT_CONFIG
    ),
    new ApiResponseHandler()
  );

  router.post("/signin", authController.signInHandler.bind(authController));
  router.post("/signup", authController.signUpHandler.bind(authController));
  router.post("/vk", authController.authWithVK.bind(authController));
  router.post("/google", authController.authWithGoogle.bind(authController));

  return router;
};

export default getAuthRouter;
