import { Buffer } from "buffer";
import * as express from "express";
import * as Crypto from "crypto";
import { FilterXSS } from "xss";
import { Connection } from "mysql2/promise";
import Axios from "axios";

import AuthorizationController from "../controllers/AuthorizationController";
import { AuthorizationService } from "../services/AuthorizationService";
import { UsersMySQLRepository } from "../repositories/UsersMySQLRepository";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import { ApiResponseHandler } from "../helpers/ApiResponseHandler";
import { JWTToken } from "../helpers/JWTToken";
import Base64 from "../helpers/Base64";
import { VKOAuth } from "../helpers/VKOAuth";
import { GoogleOAuth } from "../helpers/GoogleOAuth";
import {
  VK_CONFIG,
  GOOGLE_CONFIG,
  PASSWORD_ENCODE_CONFIG,
  JWT_CONFIG,
} from "../helpers/Configs";
import PasswordHash from "../helpers/PasswordHash";
import { UsersService } from "../services/UsersService";

const getAuthorizationRouter = (
  mySQLConnection: Connection
): express.Router => {
  const router: express.Router = express.Router();
  const jwtToken: JWTToken = new JWTToken(
    JWT_CONFIG,
    Crypto,
    new Base64(Buffer)
  );
  const passwordHash: PasswordHash = new PasswordHash(
    PASSWORD_ENCODE_CONFIG,
    Crypto
  );

  const authController: AuthorizationController = new AuthorizationController(
    new AuthorizationService(
      new UsersService(
        new UsersMySQLRepository(mySQLConnection),
        passwordHash,
        new ValidUserCredentials(new FilterXSS())
      ),
      jwtToken,
      new VKOAuth(VK_CONFIG, Axios),
      new GoogleOAuth(GOOGLE_CONFIG, Axios),
      passwordHash
    ),
    new ApiResponseHandler()
  );

  router.post("/vk", authController.signInWithVK.bind(authController));
  router.post("/google", authController.signInWithGoogle.bind(authController));
  router.post("/signin", authController.signInSimple.bind(authController));
  router.post("/signup", authController.signUpHandler.bind(authController));

  return router;
};

export default getAuthorizationRouter;
